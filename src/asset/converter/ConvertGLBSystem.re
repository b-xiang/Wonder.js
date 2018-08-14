open Js.Promise;

open Js.Typed_array;

let _convertIMGUI = extras =>
  switch (extras) {
  | None => None
  | Some(({imgui}: GLTFType.sceneExtras)) =>
    switch (imgui) {
    | None => None
    | Some({imguiFunc, customData}) =>
      Some({imguiFunc, customData}: SceneGraphType.imgui)
    }
  };

let _convertToScene =
    (
      ambientLightArr: array(WDType.ambientLight),
      {scenes, scene}: GLTFType.gltf,
    )
    : WDType.scene => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      test(
        Log.buildAssertMessage(
          ~expect={j|only has one scene|j},
          ~actual={j|not|j},
        ),
        () =>
        scenes |> Js.Array.length == 1
      );

      test(
        Log.buildAssertMessage(
          ~expect={j|has one ambientLight at most|j},
          ~actual={j|not|j},
        ),
        () =>
        ambientLightArr |> Js.Array.length <= 1
      );
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  let {nodes, extras}: GLTFType.scene =
    ConvertCommon.getScene(scenes, scene);

  {
    gameObjects: nodes |> OptionService.unsafeGet,
    ambientLight:
      ambientLightArr |> Js.Array.length == 1 ?
        Some({color: ambientLightArr[0].color}) : None,
    imgui: _convertIMGUI(extras),
  };
};

let _buildWDBJsonUint8Array = (gltf: GLTFType.gltf) => {
  let ({asset, scenes, scene, nodes, extensions}: GLTFType.gltf) as gltf =
    gltf
    |> ConvertMultiPrimitivesSystem.convertMultiPrimitivesToNodes
    |> ConvertDefaultMaterialSystem.convert;

  let transforms = ConvertTransformsSystem.convertToTransforms(gltf);

  let (bufferViewDataArr, streamChunkArr, gltf) =
    gltf |> ConvertStreamSystem.buildJsonData(transforms);

  let (ambientLightArr, directionLightArr, pointLightArr) =
    ConvertLightsSystem.convertToLights(gltf);

  let indices = ConvertIndicesSystem.convertToIndices(gltf);

  let encoder = TextEncoder.newTextEncoder();

  (
    bufferViewDataArr,
    streamChunkArr,
    encoder
    |> TextEncoder.encodeUint8Array(
         (
           {
             asset: {
               version: asset.version,
               generator: GLTFUtils.getGenerator(),
             },
             scene: _convertToScene(ambientLightArr, gltf),
             gameObjects: ConvertGameObjectsSystem.convert(gltf),
             indices,
             transforms,
             basicCameraViews:
               ConvertCamerasSystem.convertToBasicCameraViews(gltf),
             perspectiveCameraProjections:
               ConvertCamerasSystem.convertToPerspectiveCameraProjections(
                 gltf,
               ),
             arcballCameraControllers:
               ConvertCamerasSystem.convertToArcballCameraControllers(gltf),
             basicMaterials:
               ConvertMaterialsSystem.convertToBasicMaterials(gltf),
             lightMaterials:
               ConvertMaterialsSystem.convertToLightMaterials(gltf),
             geometrys: ConvertGeometrysSystem.convertToGeometrys(gltf),
             meshRenderers:
               ConvertMeshRenderersSystem.convertToMeshRenderers(
                 indices.gameObjectIndices.geometryGameObjectIndexData,
                 gltf,
               ),
             basicSourceTextures:
               ConvertTexturesSystem.convertToBasicSourceTextures(gltf),
             samplers: ConvertTexturesSystem.convertToSamplers(gltf),
             images: ConvertImagesSystem.convertToImages(gltf),
             accessors: ConvertBuffersSystem.convertToAccessors(gltf),
             bufferViews: ConvertBuffersSystem.convertToBufferViews(gltf),
             buffers: ConvertBuffersSystem.convertToBuffers(gltf),
             directionLights: directionLightArr,
             pointLights: pointLightArr,
           }: WDType.wd
         )
         |> Obj.magic
         |> Js.Json.stringify,
       ),
  );
};

let _writeHeader = (totalByteLength, dataView) =>
  dataView
  |> DataViewCommon.writeUint32_1(0x46546C68, 0)
  |> DataViewCommon.writeUint32_1(1, _, dataView)
  |> DataViewCommon.writeUint32_1(totalByteLength, _, dataView);

let _writeJson =
    (
      byteOffset,
      (emptyEncodedUint8Data, jsonByteLength, jsonUint8Array),
      dataView,
    ) => {
  let byteOffset =
    byteOffset
    |> DataViewCommon.writeUint32_1(jsonByteLength, _, dataView)
    |> DataViewCommon.writeUint32_1(0x4E4F534A, _, dataView);
  BufferUtils.copyUint8ArrayToArrayBuffer(
    byteOffset,
    (emptyEncodedUint8Data, jsonByteLength, jsonUint8Array),
    dataView,
  );
};

let _writeBinaryBuffer =
    (byteOffset, (binBufferByteLength, binBuffer), dataView) => {
  /* WonderLog.Contract.requireCheck(
       () => {
         open WonderLog;
         open Contract;
         open Operators;

         BufferUtils.checkByteLengthShouldBeAligned(binBufferByteLength);

         test(
           Log.buildAssertMessage(
             ~expect={j|binBufferByteLength === binBuffer.byteLength|j},
             ~actual={j|not|j},
           ),
           () =>
           binBufferByteLength == (binBuffer |> ArrayBuffer.byteLength)
         );
       },
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     ); */

  let byteOffset =
    byteOffset
    |> DataViewCommon.writeUint32_1(binBufferByteLength, _, dataView)
    |> DataViewCommon.writeUint32_1(0x004E4942, _, dataView);

  let binBufferUint8Arr = Uint8Array.fromBuffer(binBuffer);

  TypeArrayService.setUint8Array(
    binBufferUint8Arr,
    Uint8Array.fromBufferRange(
      dataView |> DataView.buffer,
      ~offset=byteOffset,
      ~length=binBufferByteLength / 1,
    ),
  )
  |> ignore;

  (byteOffset + binBufferByteLength, binBufferUint8Arr, dataView);
};

let _getEmptyEncodedUint8Data = () => {
  let encoder = TextEncoder.newTextEncoder();
  let emptyUint8DataArr = encoder |> TextEncoder.encodeUint8Array(" ");

  TypeArrayService.getUint8_1(0, emptyUint8DataArr);
};

let _convertGLBToWDB = (gltf: GLTFType.gltf, binBuffer) : ArrayBuffer.t => {
  let (bufferViewDataArr, streamChunkArr, jsonUint8Array) =
    _buildWDBJsonUint8Array(gltf);

  let jsonByteLength =
    jsonUint8Array |> Uint8Array.byteLength |> BufferUtils.alignedLength;

  let totalByteLength =
    /* file header: magic + version + length */
    BufferUtils.getFirstHeaderByteLength()
    /* json chunk header: json length + type */
    + BufferUtils.getChunkHeaderByteLength()
    + jsonByteLength
    + ConvertStreamSystem.getStreamChunkTotalByteLength(streamChunkArr)
    + ConvertStreamSystem.getBinBufferChunkTotalByteLength(binBuffer);

  let wdb = ArrayBuffer.make(totalByteLength);
  let dataView = DataViewCommon.create(wdb);

  let byteOffset = _writeHeader(totalByteLength, dataView);

  let emptyEncodedUint8Data = _getEmptyEncodedUint8Data();

  let (byteOffset, _, dataView) =
    _writeJson(
      byteOffset,
      (emptyEncodedUint8Data, jsonByteLength, jsonUint8Array),
      dataView,
    );

  let (byteOffset, dataView) =
    ConvertStreamSystem.buildStreamChunk(
      byteOffset,
      streamChunkArr,
      dataView,
    );

  let (byteOffset, dataView) =
    ConvertStreamSystem.buildBinBufferChunk(
      byteOffset,
      bufferViewDataArr,
      binBuffer,
      dataView,
    );

  wdb;
};

let _checkGLB = dataView => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      test(
        Log.buildAssertMessage(
          ~expect={j|Source file to be a GLB (glTF Binary) model|j},
          ~actual={j|not|j},
        ),
        () => {
          let (value, _) = DataViewCommon.getUint32_1(. 0, dataView);

          value == 0x46546C67;
        },
      );

      let (readVersion, _) = DataViewCommon.getUint32_1(. 4, dataView);

      test(
        Log.buildAssertMessage(
          ~expect={j|Only GLB version 2 is supported|j},
          ~actual={j|Detected version: $readVersion|j},
        ),
        () =>
        readVersion == 2
      );
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  dataView;
};

let convertGLBData = ((gltf, binBuffer)) =>
  _convertGLBToWDB(ConvertGLTFJsonToRecordSystem.convert(gltf), binBuffer);

let convertGLB = (glb: ArrayBuffer.t) => {
  let (gltfFileContent, binBuffer) = BufferUtils.decodeGLB(glb, _checkGLB);

  convertGLBData((gltfFileContent |> Js.Json.parseExn, binBuffer));
};
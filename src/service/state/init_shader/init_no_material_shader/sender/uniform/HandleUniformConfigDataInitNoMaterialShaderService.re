open WonderWebgl.GlType;

open RenderConfigType;

let _readUniforms =
  (.
    (gl, program, uniformLocationMap, uniformCacheMap),
    sendDataArrTuple,
    uniforms,
  ) =>
    uniforms |> OptionService.isJsonSerializedValueNone ?
      sendDataArrTuple :
      uniforms
      |> OptionService.unsafeGetJsonSerializedValue
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. sendDataArrTuple, {name, field, type_, from}) =>
             switch (from) {
             | "camera" =>
               HandleCameraUniformConfigDataService.addCameraSendData(
                 (
                   field,
                   GLSLLocationService.getUniformLocationAndCache(
                     program,
                     name,
                     uniformLocationMap,
                     gl,
                   ),
                   name,
                   type_,
                   uniformCacheMap,
                 ),
                 sendDataArrTuple,
               )
             | "model" =>
               HandleNoMaterialShaderModelUniformConfigDataService.addModelSendData(
                 (
                   field,
                   GLSLLocationService.getUniformLocationAndCache(
                     program,
                     name,
                     uniformLocationMap,
                     gl,
                   ),
                   name,
                   type_,
                   uniformCacheMap,
                 ),
                 sendDataArrTuple,
               )
             | "expand_model" =>
               HandleNoMaterialShaderModelUniformConfigDataService.addExpandModelSendData(
                 (
                   field,
                   GLSLLocationService.getUniformLocationAndCache(
                     program,
                     name,
                     uniformLocationMap,
                     gl,
                   ),
                   name,
                   type_,
                   uniformCacheMap,
                 ),
                 sendDataArrTuple,
               )
             | "no_material_shader" =>
               HandleNoMaterialShaderUniformConfigDataService.addSendData(
                 (
                   field,
                   GLSLLocationService.getUniformLocationAndCache(
                     program,
                     name,
                     uniformLocationMap,
                     gl,
                   ),
                   name,
                   type_,
                   uniformCacheMap,
                 ),
                 sendDataArrTuple,
               )
             | _ =>
               WonderLog.Log.fatal(
                 WonderLog.Log.buildFatalMessage(
                   ~title="_readUniforms",
                   ~description={j|unknow from:$from|j},
                   ~reason="",
                   ~solution={j||j},
                   ~params={j||j},
                 ),
               )
             },
           sendDataArrTuple,
         );

let _readUniformSendData =
  (. shaderLibDataArr, gl, program, (uniformLocationMap, uniformCacheMap)) =>
    HandleUniformConfigDataInitShaderAllService.readUniformSendData(
      shaderLibDataArr,
      (gl, program),
      _readUniforms,
      (uniformLocationMap, uniformCacheMap),
    );

let addUniformSendData =
  (.
    gl,
    (program: program, shaderIndex: int, shaderLibDataArr: shaderLibs),
    recordTuple,
  ) =>
    HandleUniformConfigDataInitShaderAllService.addUniformSendData(
      gl,
      (program: program, shaderIndex: int, shaderLibDataArr: shaderLibs),
      _readUniformSendData,
      recordTuple,
    );
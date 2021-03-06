open StateInitLightMaterialType;

open ShaderType;

open RenderConfigType;

let _join = (array: array(shaderLib)) => {
  let output = ref("");
  for (i in 0 to Js.Array.length(array) |> pred) {
    output := output^ ++ array[i].name;
  };
  output^;
};

let _buildShaderIndexMapKey = (shaderLibDataArr: shaderLibs) =>
  shaderLibDataArr |> _join;

let _createProgramAndInit =
    (gl, shaderIndex, (vsSource, fsSource), programRecord) =>
  gl
  |> WonderWebgl.Gl.createProgram
  |> ProgramService.registerProgram(shaderIndex, programRecord)
  |> ProgramService.initShader(vsSource, fsSource, gl);

let _initNewShader =
    (
      (shaderIndex, key),
      (gl, shaderLibDataArr),
      (
        buildGLSLSourceFunc,
        getHandleFunc,
        addAttributeSendDataFunc,
        addUniformSendDataFunc,
      ),
      (
        shaderRecord,
        programRecord,
        glslRecord,
        glslSenderRecord,
        glslLocationRecord,
        glslChunkRecord,
      ),
    ) => {
  shaderRecord
  /* |> ShaderLibShaderIndexShaderService.useShaderIndex(shaderIndex) */
  |> ShaderLibShaderIndexShaderService.setShaderIndex(key, shaderIndex)
  |> ignore;

  let (vsSource, fsSource) =
    buildGLSLSourceFunc(.
      shaderLibDataArr,
      getHandleFunc,
      (glslRecord, glslChunkRecord),
    );
  let program =
    _createProgramAndInit(
      gl,
      shaderIndex,
      (vsSource, fsSource),
      programRecord,
    );
  let recordTuple =
    addAttributeSendDataFunc(.
      (gl, shaderIndex, program),
      shaderLibDataArr,
      (glslSenderRecord, glslLocationRecord),
    );
  addUniformSendDataFunc(.
    gl,
    (program, shaderIndex, shaderLibDataArr),
    recordTuple,
  )
  |> ignore;

  shaderIndex;
};

let _initShader =
    (
      materialIndex: int,
      (gl, shaderLibDataArr),
      (
        buildGLSLSourceFunc,
        getHandleFunc,
        addAttributeSendDataFunc,
        addUniformSendDataFunc,
      ),
      (
        shaderRecord,
        programRecord,
        glslRecord,
        glslSenderRecord,
        glslLocationRecord,
        glslChunkRecord,
      ),
    ) => {
  let key = _buildShaderIndexMapKey(shaderLibDataArr);

  switch (ShaderLibShaderIndexShaderService.getShaderIndex(key, shaderRecord)) {
  | None =>
    let shaderIndex =
      ShaderIndexShaderService.genereateShaderIndex(shaderRecord);

    let shaderRecord =
      MaterialsMapShaderService.addMaterialWithoutDuplicate(
        shaderIndex,
        materialIndex,
        shaderRecord,
      );

    _initNewShader(
      (shaderIndex, key),
      (gl, shaderLibDataArr),
      (
        buildGLSLSourceFunc,
        getHandleFunc,
        addAttributeSendDataFunc,
        addUniformSendDataFunc,
      ),
      (
        shaderRecord,
        programRecord,
        glslRecord,
        glslSenderRecord,
        glslLocationRecord,
        glslChunkRecord,
      ),
    );
  | Some(shaderIndex) =>
    let _ =
      MaterialsMapShaderService.addMaterialWithoutDuplicate(
        shaderIndex,
        materialIndex,
        shaderRecord,
      );

    shaderIndex;
  };
};

let initMaterialShader =
    (
      materialIndex: int,
      (gl, shaderLibDataArr),
      (
        buildGLSLSourceFunc,
        getHandleFunc,
        addAttributeSendDataFunc,
        addUniformSendDataFunc,
      ),
      (
        shaderRecord,
        programRecord,
        glslRecord,
        glslSenderRecord,
        glslLocationRecord,
        glslChunkRecord,
      ),
    ) =>
  _initShader(
    materialIndex,
    (gl, shaderLibDataArr),
    (
      buildGLSLSourceFunc,
      getHandleFunc,
      addAttributeSendDataFunc,
      addUniformSendDataFunc,
    ),
    (
      shaderRecord,
      programRecord,
      glslRecord,
      glslSenderRecord,
      glslLocationRecord,
      glslChunkRecord,
    ),
  );

let reInitMaterialShader =
    (
      materialIndex: int,
      (gl, shaderLibDataArr),
      (
        buildGLSLSourceFunc,
        getHandleFunc,
        addAttributeSendDataFunc,
        addUniformSendDataFunc,
      ),
      (
        shaderRecord,
        programRecord,
        glslRecord,
        glslSenderRecord,
        glslLocationRecord,
        glslChunkRecord,
      ),
    ) =>
  _initShader(
    materialIndex,
    (gl, shaderLibDataArr),
    (
      buildGLSLSourceFunc,
      getHandleFunc,
      addAttributeSendDataFunc,
      addUniformSendDataFunc,
    ),
    (
      shaderRecord,
      programRecord,
      glslRecord,
      glslSenderRecord,
      glslLocationRecord,
      glslChunkRecord,
    ),
  );
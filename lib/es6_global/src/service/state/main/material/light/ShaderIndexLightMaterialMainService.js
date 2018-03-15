// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as ShaderIndexMapService$Wonderjs from "../../../../primitiive/material/ShaderIndexMapService.js";

function unsafeGetShaderIndex(materialIndex, param) {
  return ShaderIndexMapService$Wonderjs.unsafeGetShaderIndex(materialIndex, param[/* lightMaterialRecord */16][/* shaderIndexMap */1]);
}

function hasShaderIndex(materialIndex, param) {
  return ShaderIndexMapService$Wonderjs.hasShaderIndex(materialIndex, param[/* lightMaterialRecord */16][/* shaderIndexMap */1]);
}

function setShaderIndex(materialIndex, shaderIndex, state) {
  var lightMaterialRecord = state[/* lightMaterialRecord */16];
  var newrecord = state.slice();
  var newrecord$1 = lightMaterialRecord.slice();
  newrecord$1[/* shaderIndexMap */1] = ShaderIndexMapService$Wonderjs.setShaderIndex(materialIndex, shaderIndex, lightMaterialRecord[/* shaderIndexMap */1]);
  newrecord[/* lightMaterialRecord */16] = newrecord$1;
  return newrecord;
}

export {
  unsafeGetShaderIndex ,
  hasShaderIndex       ,
  setShaderIndex       ,
  
}
/* ShaderIndexMapService-Wonderjs Not a pure module */
// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as Js_option                            from "../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as PerspectiveCameraSystem$Wonderjs     from "../../system/cameraController/PerspectiveCameraSystem.js";
import * as CameraControllerStateCommon$Wonderjs from "../../system/cameraController/CameraControllerStateCommon.js";

function getPerspectiveCameraFovy(cameraController, state) {
  return Js_option.getExn(PerspectiveCameraSystem$Wonderjs.getFovy(cameraController, CameraControllerStateCommon$Wonderjs.getPerspectiveCameraData(state)));
}

function getPerspectiveCameraAspect(cameraController, state) {
  return Js_option.getExn(PerspectiveCameraSystem$Wonderjs.getAspect(cameraController, CameraControllerStateCommon$Wonderjs.getPerspectiveCameraData(state)));
}

function getPerspectiveCameraNear(cameraController, state) {
  return Js_option.getExn(PerspectiveCameraSystem$Wonderjs.getNear(cameraController, CameraControllerStateCommon$Wonderjs.getPerspectiveCameraData(state)));
}

function getPerspectiveCameraFar(cameraController, state) {
  return Js_option.getExn(PerspectiveCameraSystem$Wonderjs.getFar(cameraController, CameraControllerStateCommon$Wonderjs.getPerspectiveCameraData(state)));
}

var setPerspectiveCameraFovy = PerspectiveCameraSystem$Wonderjs.setFovy;

var setPerspectiveCameraAspect = PerspectiveCameraSystem$Wonderjs.setAspect;

var setPerspectiveCameraNear = PerspectiveCameraSystem$Wonderjs.setNear;

var setPerspectiveCameraFar = PerspectiveCameraSystem$Wonderjs.setFar;

export {
  getPerspectiveCameraFovy   ,
  setPerspectiveCameraFovy   ,
  getPerspectiveCameraAspect ,
  setPerspectiveCameraAspect ,
  getPerspectiveCameraNear   ,
  setPerspectiveCameraNear   ,
  getPerspectiveCameraFar    ,
  setPerspectiveCameraFar    ,
  
}
/* PerspectiveCameraSystem-Wonderjs Not a pure module */
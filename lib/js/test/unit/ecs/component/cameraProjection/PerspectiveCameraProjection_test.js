'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var CameraTool$Wonderjs = require("../../../../tool/service/camera/CameraTool.js");
var DisposeJob$Wonderjs = require("../../../../../src/job/no_worker/loop/DisposeJob.js");
var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var GameObjectTool$Wonderjs = require("../../../../tool/service/gameObject/GameObjectTool.js");
var UpdateCameraJob$Wonderjs = require("../../../../../src/job/no_worker/loop/UpdateCameraJob.js");
var ArrayService$WonderCommonlib = require("wonder-commonlib/lib/js/src/ArrayService.js");
var SparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/SparseMapService.js");
var PerspectiveCameraProjectionAPI$Wonderjs = require("../../../../../src/api/camera/PerspectiveCameraProjectionAPI.js");
var PerspectiveCameraProjectionTool$Wonderjs = require("../../../../tool/service/camera/PerspectiveCameraProjectionTool.js");

describe("PerspectiveCameraProjection", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("createPerspectiveCameraProjection", (function () {
                Wonder_jest.test("create a new camera which is just index(int)", (function () {
                        var match = PerspectiveCameraProjectionAPI$Wonderjs.createPerspectiveCameraProjection(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[1]), 0);
                      }));
                describe("change state", (function () {
                        return Wonder_jest.test("state->index + 1", (function () {
                                      var match = PerspectiveCameraProjectionAPI$Wonderjs.createPerspectiveCameraProjection(state[0]);
                                      var record = match[0][/* perspectiveCameraProjectionRecord */14];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](record[/* index */0]), 1);
                                    }));
                      }));
                return Wonder_jest.test("add to dirty array", (function () {
                              var match = PerspectiveCameraProjectionAPI$Wonderjs.createPerspectiveCameraProjection(state[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](PerspectiveCameraProjectionTool$Wonderjs.getDirtyArray(match[0])), /* array */[match[1]]);
                            }));
              }));
        describe("getAllPerspectiveCameraProjections", (function () {
                var _createPerspectiveCameraProjectionGameObjects = function (state) {
                  var match = CameraTool$Wonderjs.createCameraGameObject(state[0]);
                  var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                  var match$2 = CameraTool$Wonderjs.createCameraGameObject(match$1[0]);
                  return /* tuple */[
                          match$2[0],
                          /* tuple */[
                            match[1],
                            match$1[1],
                            match$2[1]
                          ],
                          /* tuple */[
                            match[3][1],
                            match$1[3][1],
                            match$2[3][1]
                          ]
                        ];
                };
                Wonder_jest.test("get all cameraProjections include the ones add or not add to gameObject", (function () {
                        var match = _createPerspectiveCameraProjectionGameObjects(state);
                        var match$1 = match[2];
                        var match$2 = PerspectiveCameraProjectionAPI$Wonderjs.createPerspectiveCameraProjection(match[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](PerspectiveCameraProjectionAPI$Wonderjs.getAllPerspectiveCameraProjections(match$2[0])), /* array */[
                                    match$1[0],
                                    match$1[1],
                                    match$1[2],
                                    match$2[1]
                                  ]);
                      }));
                return Wonder_jest.test("test dispose", (function () {
                              var match = _createPerspectiveCameraProjectionGameObjects(state);
                              var match$1 = match[1];
                              var state$1 = GameObjectAPI$Wonderjs.disposeGameObject(match$1[2], GameObjectAPI$Wonderjs.disposeGameObject(match$1[1], match[0]));
                              var state$2 = DisposeJob$Wonderjs.execJob(undefined, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.getAllPerspectiveCameraProjectionComponents(state$2)), /* array */[match[2][0]]);
                            }));
              }));
        describe("markPerspectiveCameraProjectionDirty", (function () {
                return Wonder_jest.test("mark dirty", (function () {
                              var match = CameraTool$Wonderjs.createCameraGameObject(state[0]);
                              var cameraProjection1 = match[3][1];
                              var state$1 = UpdateCameraJob$Wonderjs.execJob(undefined, match[0]);
                              var state$2 = PerspectiveCameraProjectionAPI$Wonderjs.markPerspectiveCameraProjectionDirty(cameraProjection1, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](PerspectiveCameraProjectionTool$Wonderjs.getDirtyArray(state$2)), /* array */[cameraProjection1]);
                            }));
              }));
        describe("markPerspectiveCameraProjectionNotDirty", (function () {
                return Wonder_jest.test("mark not dirty", (function () {
                              var match = CameraTool$Wonderjs.createCameraGameObject(state[0]);
                              var cameraProjection1 = match[3][1];
                              var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                              var state$1 = PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionFar(cameraProjection1, 2, match$1[0]);
                              var state$2 = PerspectiveCameraProjectionAPI$Wonderjs.markPerspectiveCameraProjectionNotDirty(cameraProjection1, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayService$WonderCommonlib.removeDuplicateItems(PerspectiveCameraProjectionTool$Wonderjs.getDirtyArray(state$2))), /* array */[match$1[3][1]]);
                            }));
              }));
        describe("unsafeGetPerspectiveCameraProjectionGameObject", (function () {
                return Wonder_jest.test("get cameraProjection's gameObject", (function () {
                              var match = PerspectiveCameraProjectionAPI$Wonderjs.createPerspectiveCameraProjection(state[0]);
                              var cameraProjection = match[1];
                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                              var gameObject = match$1[1];
                              var state$1 = GameObjectAPI$Wonderjs.addGameObjectPerspectiveCameraProjectionComponent(gameObject, cameraProjection, match$1[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraProjectionGameObject(cameraProjection, state$1)), gameObject);
                            }));
              }));
        describe("dispose component", (function () {
                var _prepareTwo = function (state) {
                  var match = CameraTool$Wonderjs.createCameraGameObject(state);
                  var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                  return /* tuple */[
                          match$1[0],
                          match[1],
                          match[3][1],
                          match$1[1],
                          match$1[3][1]
                        ];
                };
                describe("dispose data", (function () {
                        Wonder_jest.test("dirtyArray: remove from array(include duplicated ones)", (function () {
                                var match = CameraTool$Wonderjs.createCameraGameObject(state[0]);
                                var perspectiveCameraProjection1 = match[3][1];
                                var state$1 = PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionFar(perspectiveCameraProjection1, 1000, PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionNear(perspectiveCameraProjection1, 0.1, match[0]));
                                var state$2 = GameObjectTool$Wonderjs.disposeGameObjectPerspectiveCameraProjectionComponent(match[1], perspectiveCameraProjection1, state$1);
                                var match$1 = state$2[/* perspectiveCameraProjectionRecord */14];
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[/* dirtyArray */1]), /* array */[]);
                              }));
                        Wonder_jest.test("remove from pMatrixMap, gameObjectMap", (function () {
                                var match = CameraTool$Wonderjs.createCameraGameObject(state[0]);
                                var perspectiveCameraProjection1 = match[3][1];
                                var state$1 = PerspectiveCameraProjectionTool$Wonderjs.updateCameraProjection(perspectiveCameraProjection1, match[0]);
                                var state$2 = GameObjectTool$Wonderjs.disposeGameObjectPerspectiveCameraProjectionComponent(match[1], perspectiveCameraProjection1, state$1);
                                var match$1 = state$2[/* perspectiveCameraProjectionRecord */14];
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                SparseMapService$WonderCommonlib.has(perspectiveCameraProjection1, match$1[/* pMatrixMap */2]),
                                                SparseMapService$WonderCommonlib.has(perspectiveCameraProjection1, match$1[/* gameObjectMap */7])
                                              ]), /* tuple */[
                                            false,
                                            false
                                          ]);
                              }));
                        return Wonder_jest.test("remove from nearMap, farMap, fovyMap, aspectMap", (function () {
                                      var match = CameraTool$Wonderjs.createCameraGameObject(state[0]);
                                      var perspectiveCameraProjection1 = match[3][1];
                                      var state$1 = GameObjectTool$Wonderjs.disposeGameObjectPerspectiveCameraProjectionComponent(match[1], perspectiveCameraProjection1, match[0]);
                                      var record = state$1[/* perspectiveCameraProjectionRecord */14];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      SparseMapService$WonderCommonlib.has(perspectiveCameraProjection1, record[/* nearMap */3]),
                                                      SparseMapService$WonderCommonlib.has(perspectiveCameraProjection1, record[/* farMap */4]),
                                                      SparseMapService$WonderCommonlib.has(perspectiveCameraProjection1, record[/* fovyMap */5]),
                                                      SparseMapService$WonderCommonlib.has(perspectiveCameraProjection1, record[/* aspectMap */6])
                                                    ]), /* tuple */[
                                                  false,
                                                  false,
                                                  false,
                                                  false
                                                ]);
                                    }));
                      }));
                describe("test add new one after dispose old one", (function () {
                        Wonder_jest.test("use disposed index as new index firstly", (function () {
                                var match = _prepareTwo(state[0]);
                                var perspectiveCameraProjection1 = match[2];
                                var state$1 = GameObjectTool$Wonderjs.disposeGameObjectPerspectiveCameraProjectionComponent(match[1], perspectiveCameraProjection1, match[0]);
                                var match$1 = CameraTool$Wonderjs.createCameraGameObject(state$1);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[3][1]), perspectiveCameraProjection1);
                              }));
                        return Wonder_jest.test("if has no disposed index, get index from record.index", (function () {
                                      var match = _prepareTwo(state[0]);
                                      var perspectiveCameraProjection1 = match[2];
                                      var state$1 = GameObjectTool$Wonderjs.disposeGameObjectPerspectiveCameraProjectionComponent(match[1], perspectiveCameraProjection1, match[0]);
                                      var match$1 = CameraTool$Wonderjs.createCameraGameObject(state$1);
                                      var match$2 = CameraTool$Wonderjs.createCameraGameObject(match$1[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      match$1[3][1],
                                                      match$2[3][1]
                                                    ]), /* tuple */[
                                                  perspectiveCameraProjection1,
                                                  match[4] + 1 | 0
                                                ]);
                                    }));
                      }));
                describe("contract check", (function () {
                        return Wonder_jest.test("expect dispose the alive component, but actual not", (function () {
                                      var match = _prepareTwo(state[0]);
                                      var perspectiveCameraProjection1 = match[2];
                                      var gameObject1 = match[1];
                                      var state$1 = GameObjectTool$Wonderjs.disposeGameObjectPerspectiveCameraProjectionComponent(gameObject1, perspectiveCameraProjection1, match[0]);
                                      return Wonder_jest.Expect[/* toThrowMessage */20]("expect dispose the alive component, but actual not", Wonder_jest.Expect[/* expect */0]((function () {
                                                        GameObjectTool$Wonderjs.disposeGameObjectPerspectiveCameraProjectionComponent(gameObject1, perspectiveCameraProjection1, state$1);
                                                        return /* () */0;
                                                      })));
                                    }));
                      }));
                return /* () */0;
              }));
        describe("contract check: is alive", (function () {
                describe("if cameraProjection is disposed", (function () {
                        var _testGetFunc = function (getFunc) {
                          var match = CameraTool$Wonderjs.createCameraGameObject(state[0]);
                          var cameraProjection = match[3][1];
                          var state$1 = GameObjectTool$Wonderjs.disposeGameObjectPerspectiveCameraProjectionComponent(match[1], cameraProjection, match[0]);
                          return Wonder_jest.Expect[/* toThrowMessage */20]("expect component alive, but actual not", Wonder_jest.Expect[/* expect */0]((function () {
                                            return Curry._2(getFunc, cameraProjection, state$1);
                                          })));
                        };
                        Wonder_jest.test("unsafeGetPerspectiveCameraProjectionGameObject should error", (function () {
                                return _testGetFunc(PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraProjectionGameObject);
                              }));
                        return Wonder_jest.test("unsafeGetPerspectiveCameraProjectionPMatrix should error", (function () {
                                      return _testGetFunc(PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraProjectionPMatrix);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("getFovy", (function () {
                return Wonder_jest.test("test", (function () {
                              var match = PerspectiveCameraProjectionAPI$Wonderjs.createPerspectiveCameraProjection(state[0]);
                              var cameraProjection = match[1];
                              var state$1 = PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionFovy(cameraProjection, 65, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraFovy(cameraProjection, state$1)), 65);
                            }));
              }));
        describe("getAspect", (function () {
                return Wonder_jest.test("test", (function () {
                              var match = PerspectiveCameraProjectionAPI$Wonderjs.createPerspectiveCameraProjection(state[0]);
                              var cameraProjection = match[1];
                              var state$1 = PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionAspect(cameraProjection, 1, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraAspect(cameraProjection, state$1)), 1);
                            }));
              }));
        describe("getNear", (function () {
                return Wonder_jest.test("test", (function () {
                              var match = PerspectiveCameraProjectionAPI$Wonderjs.createPerspectiveCameraProjection(state[0]);
                              var cameraProjection = match[1];
                              var state$1 = PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionNear(cameraProjection, 0.1, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraNear(cameraProjection, state$1)), 0.1);
                            }));
              }));
        describe("getFar", (function () {
                return Wonder_jest.test("test", (function () {
                              var match = PerspectiveCameraProjectionAPI$Wonderjs.createPerspectiveCameraProjection(state[0]);
                              var cameraProjection = match[1];
                              var state$1 = PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionFar(cameraProjection, 1000, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraFar(cameraProjection, state$1)), 1000);
                            }));
              }));
        return /* () */0;
      }));

/*  Not a pure module */

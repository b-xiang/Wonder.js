// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as Sinon                                          from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1                                        from "sinon";
import * as Wonder_jest                                    from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as SettingTool$Wonderjs                           from "../../../../tool/service/setting/SettingTool.js";
import * as MainStateTool$Wonderjs                         from "../../../../tool/service/state/MainStateTool.js";
import * as TestWorkerTool$Wonderjs                        from "../../tool/TestWorkerTool.js";
import * as FakeGlWorkerTool$Wonderjs                      from "../../tool/FakeGlWorkerTool.js";
import * as TestMainWorkerTool$Wonderjs                    from "./tool/TestMainWorkerTool.js";
import * as RenderJobsRenderWorkerTool$Wonderjs            from "../render_worker/tool/RenderJobsRenderWorkerTool.js";
import * as ReallocateGameObjectCPUMemoryTool$Wonderjs     from "../../../../tool/reallocate/ReallocateGameObjectCPUMemoryTool.js";
import * as ReallocateCustomGeometryCPUMemoryTool$Wonderjs from "../../../../tool/reallocate/ReallocateCustomGeometryCPUMemoryTool.js";

describe("test reallocate cpu memory main worker job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = [MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* Some */[SettingTool$Wonderjs.buildBufferConfigStr(/* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* () */0)], /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return TestWorkerTool$Wonderjs.clear(sandbox);
              }));
        describe("should only reallocate once in one loop", (function () {
                Wonder_jest.testPromise("test reallocate gameObject", (function () {
                        var match = ReallocateGameObjectCPUMemoryTool$Wonderjs.prepareForOptimize(state);
                        var gameObject3 = match[3];
                        var gameObject2 = match[2];
                        var gameObject1 = match[1];
                        var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* () */0), match[0]);
                        var state$2 = MainStateTool$Wonderjs.setState(state$1);
                        return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function () {
                                      var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                      return Promise.resolve(ReallocateGameObjectCPUMemoryTool$Wonderjs.judgeForOptimize(state, gameObject1, gameObject2, gameObject3));
                                    }), state$2, sandbox, /* None */0, /* () */0);
                      }));
                return Wonder_jest.testPromise("test reallocate customGeometry", (function () {
                              var match = ReallocateCustomGeometryCPUMemoryTool$Wonderjs.prepareForOptimize(state);
                              var match$1 = match[5];
                              var indices3 = match$1[2];
                              var indices2 = match$1[1];
                              var indices1 = match$1[0];
                              var match$2 = match[4];
                              var normals3 = match$2[2];
                              var normals2 = match$2[1];
                              var normals1 = match$2[0];
                              var match$3 = match[3];
                              var vertices3 = match$3[2];
                              var vertices2 = match$3[1];
                              var vertices1 = match$3[0];
                              var match$4 = match[2];
                              var geometry3 = match$4[2];
                              var geometry2 = match$4[1];
                              var geometry1 = match$4[0];
                              var match$5 = match[1];
                              var gameObject3 = match$5[2];
                              var gameObject2 = match$5[1];
                              var gameObject1 = match$5[0];
                              var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* () */0), match[0]);
                              var state$2 = MainStateTool$Wonderjs.setState(state$1);
                              return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function () {
                                            var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                            return Promise.resolve(ReallocateCustomGeometryCPUMemoryTool$Wonderjs.judgeForOptimize(state, /* tuple */[
                                                            gameObject1,
                                                            gameObject2,
                                                            gameObject3
                                                          ], /* tuple */[
                                                            geometry1,
                                                            geometry2,
                                                            geometry3
                                                          ], /* tuple */[
                                                            vertices1,
                                                            vertices2,
                                                            vertices3
                                                          ], /* tuple */[
                                                            normals1,
                                                            normals2,
                                                            normals3
                                                          ], /* tuple */[
                                                            indices1,
                                                            indices2,
                                                            indices3
                                                          ]));
                                          }), state$2, sandbox, /* None */0, /* () */0);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
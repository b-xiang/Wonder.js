'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var JobAPI$Wonderjs = require("../../../../src/api/JobAPI.js");
var ArrayService$Wonderjs = require("../../../../src/service/atom/ArrayService.js");
var MainStateTool$Wonderjs = require("../../../tool/service/state/MainStateTool.js");
var SettingWorkerTool$Wonderjs = require("../../../integration/worker/tool/SettingWorkerTool.js");
var TestMainWorkerTool$Wonderjs = require("../../../integration/worker/job/main_worker/tool/TestMainWorkerTool.js");
var StateDataMainService$Wonderjs = require("../../../../src/service/state/main/state/StateDataMainService.js");
var MainInitJobMainWorkerTool$Wonderjs = require("../../../integration/worker/job/main_worker/tool/MainInitJobMainWorkerTool.js");
var WorkerInstanceMainWorkerTool$Wonderjs = require("../../../integration/worker/job/main_worker/tool/WorkerInstanceMainWorkerTool.js");

describe("operate custom worker job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                SettingWorkerTool$Wonderjs.buildFakeCanvasForNotPassCanvasId(sandbox);
                state[0] = TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test operate custom job", (function () {
                describe("test operate main init job", (function () {
                        describe("addWorkerMainInitJob", (function () {
                                describe("add job to main init pipeline", (function () {
                                        describe("test add job after target job", (function () {
                                                Wonder_jest.testPromise("test add job to group job", (function () {
                                                        var customData = /* array */[];
                                                        JobAPI$Wonderjs.addWorkerMainInitJob(/* tuple */[
                                                              "customJob1",
                                                              "transfer_job_data"
                                                            ], /* AFTER */1, (function (stateData) {
                                                                StateDataMainService$Wonderjs.unsafeGetState(stateData);
                                                                ArrayService$Wonderjs.push(1, customData);
                                                                return /* () */0;
                                                              }), state[0]);
                                                        return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function () {
                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](customData), /* array */[1]);
                                                                    }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                                                      }));
                                                Wonder_jest.testPromise("test add job to concat job and merge job", (function () {
                                                        var customData = /* array */[];
                                                        JobAPI$Wonderjs.addWorkerMainInitJob(/* tuple */[
                                                              "customJob2",
                                                              "send_job_data"
                                                            ], /* AFTER */1, (function () {
                                                                ArrayService$Wonderjs.push(2, customData);
                                                                return /* () */0;
                                                              }), JobAPI$Wonderjs.addWorkerMainInitJob(/* tuple */[
                                                                  "customJob1",
                                                                  "transfer_job_data"
                                                                ], /* AFTER */1, (function (stateData) {
                                                                    StateDataMainService$Wonderjs.unsafeGetState(stateData);
                                                                    ArrayService$Wonderjs.push(1, customData);
                                                                    return /* () */0;
                                                                  }), state[0]));
                                                        return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function () {
                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](customData), /* array */[
                                                                                  2,
                                                                                  1
                                                                                ]);
                                                                    }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                                                      }));
                                                return Wonder_jest.testPromise("test add two job", (function () {
                                                              var customData = /* array */[];
                                                              JobAPI$Wonderjs.addWorkerMainInitJob(/* tuple */[
                                                                    "customJob2",
                                                                    "customJob1"
                                                                  ], /* AFTER */1, (function () {
                                                                      ArrayService$Wonderjs.push(2, customData);
                                                                      return /* () */0;
                                                                    }), JobAPI$Wonderjs.addWorkerMainInitJob(/* tuple */[
                                                                        "customJob1",
                                                                        "send_init_render_data"
                                                                      ], /* AFTER */1, (function (stateData) {
                                                                          StateDataMainService$Wonderjs.unsafeGetState(stateData);
                                                                          ArrayService$Wonderjs.push(1, customData);
                                                                          return /* () */0;
                                                                        }), state[0]));
                                                              return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function () {
                                                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](customData), /* array */[
                                                                                        1,
                                                                                        2
                                                                                      ]);
                                                                          }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                                                            }));
                                              }));
                                        return Wonder_jest.testPromise("test add job to head", (function () {
                                                      var customData = /* array */[];
                                                      JobAPI$Wonderjs.addWorkerMainInitJob(/* tuple */[
                                                            "customJob2",
                                                            "customJob1"
                                                          ], /* BEFORE */0, (function () {
                                                              ArrayService$Wonderjs.push(2, customData);
                                                              return /* () */0;
                                                            }), JobAPI$Wonderjs.addWorkerMainInitJob(/* tuple */[
                                                                "customJob1",
                                                                "transfer_job_data"
                                                              ], /* BEFORE */0, (function (stateData) {
                                                                  StateDataMainService$Wonderjs.unsafeGetState(stateData);
                                                                  ArrayService$Wonderjs.push(1, customData);
                                                                  return /* () */0;
                                                                }), state[0]));
                                                      return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function () {
                                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](customData), /* array */[
                                                                                2,
                                                                                1
                                                                              ]);
                                                                  }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("removeWorkerMainInitJob", (function () {
                                Wonder_jest.testPromise("test remove custom added job", (function () {
                                        var customData = /* array */[];
                                        JobAPI$Wonderjs.removeWorkerMainInitJob("customJob", JobAPI$Wonderjs.addWorkerMainInitJob(/* tuple */[
                                                  "customJob",
                                                  "transfer_job_data"
                                                ], /* AFTER */1, (function (stateData) {
                                                    StateDataMainService$Wonderjs.unsafeGetState(stateData);
                                                    ArrayService$Wonderjs.push(1, customData);
                                                    return /* () */0;
                                                  }), state[0]));
                                        return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function () {
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](customData), /* array */[]);
                                                    }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                                      }));
                                describe("test remove default job", (function () {
                                        Wonder_jest.testPromise("test remove group job", (function () {
                                                JobAPI$Wonderjs.removeWorkerMainInitJob("transfer_job_data", state[0]);
                                                return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                                              return Sinon.toCalledWith(/* array */[{
                                                                            operateType: "SEND_JOB_DATA",
                                                                            pipelineJobs: Sinon$1.match.any,
                                                                            jobs: Sinon$1.match.any
                                                                          }], Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker)));
                                                            }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                                              }));
                                        return Wonder_jest.testPromise("test remove atom job", (function () {
                                                      JobAPI$Wonderjs.removeWorkerMainInitJob("get_finish_send_job_data", JobAPI$Wonderjs.removeWorkerMainInitJob("send_job_data", state[0]));
                                                      return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                                                    return Sinon.toCalledWith(/* array */[{
                                                                                  operateType: "SEND_JOB_DATA",
                                                                                  pipelineJobs: Sinon$1.match.any,
                                                                                  jobs: Sinon$1.match.any
                                                                                }], Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker)));
                                                                  }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

/*  Not a pure module */

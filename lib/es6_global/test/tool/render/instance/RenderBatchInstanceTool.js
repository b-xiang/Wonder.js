

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Caml_int32 from "../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Js_primitive from "../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as FakeGlTool$Wonderjs from "../../gl/FakeGlTool.js";
import * as DirectorTool$Wonderjs from "../../core/DirectorTool.js";
import * as GeometryTool$Wonderjs from "../../service/geometry/GeometryTool.js";
import * as RenderJobsTool$Wonderjs from "../../job/no_worker/loop/RenderJobsTool.js";
import * as GLSLLocationTool$Wonderjs from "../../service/location/GLSLLocationTool.js";
import * as CreateRenderStateMainService$Wonderjs from "../../../../src/service/state/main/render/CreateRenderStateMainService.js";
import * as RenderBasicBatchInstanceTool$Wonderjs from "./RenderBasicBatchInstanceTool.js";

function testProgram(sandbox, _, state) {
  var _prepareForUseProgram = function (sandbox, state) {
    var match = RenderBasicBatchInstanceTool$Wonderjs.prepare(sandbox, 1, state);
    var createProgram = Sinon.returns(1, Sinon.onCall(0, Sinon.createEmptyStubWithJsObjSandbox(sandbox)));
    var useProgram = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
    var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(createProgram), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(useProgram), undefined, /* () */0), match[0]);
    return /* tuple */[
            state$1,
            1,
            createProgram,
            useProgram
          ];
  };
  Wonder_jest.test("create program and use program only once", (function () {
          var match = _prepareForUseProgram(sandbox, state[0]);
          DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match[0]));
          return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(match[2])), 1);
        }));
  return Wonder_jest.test("only use sourceInstance's gameObject's program", (function () {
                var match = _prepareForUseProgram(sandbox, state[0]);
                DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match[0]));
                return Sinon.toCalledWith(/* array */[match[1]], Wonder_jest.Expect[/* expect */0](match[3]));
              }));
}

function testAttachBufferToAttribute(sandbox, param, prepareFunc, state) {
  var size = param[2];
  var callIndex = param[1];
  var name = param[0];
  return Wonder_jest.test("test attach buffer to attribute", (function () {
                var match = Curry._3(prepareFunc, sandbox, 1, state[0]);
                var vertexAttribPointer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                var getAttribLocation = GLSLLocationTool$Wonderjs.getAttribLocation(0, sandbox, name);
                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getAttribLocation), undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(vertexAttribPointer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                return Sinon.toCalledWith(/* array */[
                            0,
                            size,
                            1,
                            false,
                            0,
                            0
                          ], Wonder_jest.Expect[/* expect */0](Sinon.getCall(callIndex, vertexAttribPointer)));
              }));
}

function testSendShaderUniformData(sandbox, param, state) {
  var createSourceInstanceGameObjectFunc = param[1];
  var prepareFunc = param[0];
  return Wonder_jest.test("send shader uniform record only once per shader", (function () {
                var match = Curry._3(prepareFunc, sandbox, 1, state[0]);
                var match$1 = Curry._3(createSourceInstanceGameObjectFunc, sandbox, 1, match[0]);
                var match$2 = RenderJobsTool$Wonderjs.prepareGameObject(sandbox, match$1[0]);
                var uniformMatrix4fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(1, sandbox, "u_vMatrix");
                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(uniformMatrix4fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$2[0]);
                DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(1, uniformMatrix4fv))), 2);
              }));
}

function testDrawElements(sandbox, prepareFunc, getIndicesCountFunc, state) {
  return Wonder_jest.test("drawElements", (function () {
                var match = Curry._3(prepareFunc, sandbox, 3, state[0]);
                var drawElements = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(drawElements), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                var state$2 = RenderJobsTool$Wonderjs.init(state$1);
                var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withFourArgs(1, Curry._2(getIndicesCountFunc, match[2], CreateRenderStateMainService$Wonderjs.createRenderState(state$3)), GeometryTool$Wonderjs.getIndexType(CreateRenderStateMainService$Wonderjs.createRenderState(state$3)), Caml_int32.imul(GeometryTool$Wonderjs.getIndexTypeSize(CreateRenderStateMainService$Wonderjs.createRenderState(state$3)), 0), drawElements))), 4);
              }));
}

export {
  testProgram ,
  testAttachBufferToAttribute ,
  testSendShaderUniformData ,
  testDrawElements ,
  
}
/* Sinon Not a pure module */

// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as Js_option                from "../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Contract$Wonderjs        from "../../../../definition/Contract.js";
import * as Js_null_undefined        from "../../../../../../../node_modules/bs-platform/lib/es6/js_null_undefined.js";
import * as ComponentSystem$Wonderjs from "../../system/component/ComponentSystem.js";
import * as TransformSystem$Wonderjs from "../../system/transform/TransformSystem.js";

function getTransformGameObject(transform, state) {
  Contract$Wonderjs.requireCheck((function () {
          return ComponentSystem$Wonderjs.checkComponentShouldAlive(transform, TransformSystem$Wonderjs.isAlive, state);
        }));
  return Js_option.getExn(TransformSystem$Wonderjs.getGameObject(transform, state));
}

function getTransformParent(transform, state) {
  Contract$Wonderjs.requireCheck((function () {
          return ComponentSystem$Wonderjs.checkComponentShouldAlive(transform, TransformSystem$Wonderjs.isAlive, state);
        }));
  return Js_null_undefined.from_opt(TransformSystem$Wonderjs.getParent(transform, state));
}

function setTransformParent(parent, child, state) {
  Contract$Wonderjs.requireCheck((function () {
          Js_null_undefined.iter(parent, (function (parent) {
                  return ComponentSystem$Wonderjs.checkComponentShouldAlive(parent, TransformSystem$Wonderjs.isAlive, state);
                }));
          return ComponentSystem$Wonderjs.checkComponentShouldAlive(child, TransformSystem$Wonderjs.isAlive, state);
        }));
  return TransformSystem$Wonderjs.setParent(parent, child, state);
}

function getTransformChildren(transform, state) {
  Contract$Wonderjs.requireCheck((function () {
          return ComponentSystem$Wonderjs.checkComponentShouldAlive(transform, TransformSystem$Wonderjs.isAlive, state);
        }));
  return TransformSystem$Wonderjs.getChildren(transform, state);
}

function getTransformLocalPosition(transform, state) {
  Contract$Wonderjs.requireCheck((function () {
          return ComponentSystem$Wonderjs.checkComponentShouldAlive(transform, TransformSystem$Wonderjs.isAlive, state);
        }));
  return TransformSystem$Wonderjs.getLocalPositionTuple(transform, state);
}

function setTransformLocalPosition(transform, localPosition, state) {
  Contract$Wonderjs.requireCheck((function () {
          return ComponentSystem$Wonderjs.checkComponentShouldAlive(transform, TransformSystem$Wonderjs.isAlive, state);
        }));
  return TransformSystem$Wonderjs.setLocalPositionByTuple(transform, localPosition, state);
}

function getTransformPosition(transform, state) {
  Contract$Wonderjs.requireCheck((function () {
          return ComponentSystem$Wonderjs.checkComponentShouldAlive(transform, TransformSystem$Wonderjs.isAlive, state);
        }));
  return TransformSystem$Wonderjs.getPositionTuple(transform, state);
}

function setTransformPosition(transform, position, state) {
  Contract$Wonderjs.requireCheck((function () {
          return ComponentSystem$Wonderjs.checkComponentShouldAlive(transform, TransformSystem$Wonderjs.isAlive, state);
        }));
  return TransformSystem$Wonderjs.setPositionByTuple(transform, position, state);
}

var createTransform = TransformSystem$Wonderjs.create;

export {
  createTransform           ,
  getTransformGameObject    ,
  getTransformParent        ,
  setTransformParent        ,
  getTransformChildren      ,
  getTransformLocalPosition ,
  setTransformLocalPosition ,
  getTransformPosition      ,
  setTransformPosition      ,
  
}
/* TransformSystem-Wonderjs Not a pure module */
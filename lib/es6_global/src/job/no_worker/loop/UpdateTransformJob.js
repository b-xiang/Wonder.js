// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as UpdateTransformJobUtils$Wonderjs    from "../../utils/UpdateTransformJobUtils.js";
import * as RecordTransformMainService$Wonderjs from "../../../service/state/main/transform/RecordTransformMainService.js";

function execJob(_, state) {
  var transformRecord = RecordTransformMainService$Wonderjs.getRecord(state);
  var index = transformRecord[/* index */0];
  var newrecord = state.slice();
  newrecord[/* transformRecord */11] = /* Some */[UpdateTransformJobUtils$Wonderjs.execJob(index, state[/* globalTempRecord */32], transformRecord)];
  return newrecord;
}

export {
  execJob ,
  
}
/* UpdateTransformJobUtils-Wonderjs Not a pure module */
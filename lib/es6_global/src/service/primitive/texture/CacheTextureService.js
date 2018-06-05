// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as Log$WonderLog                    from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog               from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs           from "../../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs      from "../../state/main/state/IsDebugMainService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function isCached(unit, texture, bindTextureUnitCacheMap) {
  var match = SparseMapService$WonderCommonlib.get(unit, bindTextureUnitCacheMap);
  if (match) {
    return +(match[0] === texture);
  } else {
    return /* false */0;
  }
}

function addActiveTexture(unit, texture, bindTextureUnitCacheMap) {
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("not cached", ""), (function () {
                        return Contract$WonderLog.assertFalse(isCached(unit, texture, bindTextureUnitCacheMap));
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return SparseMapService$WonderCommonlib.set(unit, texture, bindTextureUnitCacheMap);
}

export {
  isCached         ,
  addActiveTexture ,
  
}
/* Log-WonderLog Not a pure module */
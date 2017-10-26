open ComponentSystem;

open TransformOperateDataSystem;

open TransformType;

open TypeArrayUtils;

open StateDataType;

open Contract;

open TransformDirtySystem;

open TransformHierachySystem;

let _getTransformData (state: StateDataType.state) => Js.Option.getExn state.transformData;

let create (state: StateDataType.state) => {
  let transformData = _getTransformData state;
  let index = transformData.index;
  transformData.index = succ transformData.index;
  (state, index)
  |> ensureCheck (
       fun (state, _) => {
         open Contract.Operators;
         let {index} = _getTransformData state;
         let maxCount = getMaxCount state;
         test "index should <= maxCount" (fun () => index <= maxCount)
       }
     )
};

let _setDefaultTypeArrData (count: int) (buffer, localToWorldMatrices, localPositions) => {
  /* let defaultPositions = [|0., 0., 0.|]; */
  let defaultLocalToWorldMatrices = [|
    1.,
    0.,
    0.,
    0.,
    0.,
    1.,
    0.,
    0.,
    0.,
    0.,
    1.,
    0.,
    0.,
    0.,
    0.,
    1.
  |];
  let rec _set
          (index: int)
          (increase: int)
          (data: array float)
          setFunc
          (typeArr: Js.Typed_array.Float32Array.t) =>
    if (index >= count) {
      typeArr
    } else {
      setFunc index data typeArr [@bs] |> _set (index + increase) increase data setFunc
    };
  (
    buffer,
    localPositions,
    _set
      0
      (getMatrix4DataSize ())
      defaultLocalToWorldMatrices
      setLocalToWorldMatricesTypeArr
      localToWorldMatrices
  )
};

let _initBufferData (count: int) => {
  open Js.Typed_array;
  let size: int =
    Float32Array._BYTES_PER_ELEMENT * (getMatrix4DataSize () + getVector3DataSize ());
  let buffer = ArrayBuffer.make (count * size);
  let typeArrCount = ref (count * getMatrix4DataSize ());
  let offset = ref 0;
  let localToWorldMatrices =
    Float32Array.fromBufferRange buffer offset::!offset length::!typeArrCount;
  offset := !typeArrCount * Float32Array._BYTES_PER_ELEMENT;
  typeArrCount := count * getVector3DataSize ();
  let localPositions = Float32Array.fromBufferRange buffer offset::!offset length::!typeArrCount;
  offset := !offset + !typeArrCount * Float32Array._BYTES_PER_ELEMENT;
  /* todo set localRotations,localScales */
  (buffer, localToWorldMatrices, localPositions) |> _setDefaultTypeArrData count
};

let _setDefaultChildren (maxCount: int) ({childMap} as transformData) => {
  for index in 0 to (maxCount - 1) {
    HashMapSystem.set (Js.Int.toString index) (ArraySystem.createEmpty ()) childMap |> ignore
  };
  transformData
};

let getParent (child: transform) (state: StateDataType.state) =>
  TransformHierachySystem.getParent (Js.Int.toString child) (_getTransformData state);

let setParent (parent: Js.nullable transform) (child: transform) (state: StateDataType.state) => {
  TransformHierachySystem.setParent (Js.toOption parent) child (_getTransformData state)
  |> addItAndItsChildrenToDirtyList child
  |> ignore;
  state
};

let getChildren (transform: transform) (state: StateDataType.state) =>
  _getTransformData state |> unsafeGetChildren (Js.Int.toString transform) |> ArraySystem.copy;

let update (state: StateDataType.state) => {
  TransformUpdateSystem.update (_getTransformData state) |> ignore;
  state
};

let getLocalPosition (transform: transform) (state: StateDataType.state) =>
  getFloat3 (getVector3DataIndex transform) (_getTransformData state).localPositions;

let setLocalPosition (transform: transform) (localPosition: position) (state: StateDataType.state) => {
  let transformData = _getTransformData state;
  /* todo check alive? */
  setFloat3
    (getVector3DataIndex transform)
    (TransformCastTypeUtils.tupleToJsArray localPosition)
    transformData.localPositions
  |> ignore;
  addItAndItsChildrenToDirtyList transform transformData |> ignore;
  state
};

/* todo add cache? */
let getPosition (transform: transform) (state: StateDataType.state) => {
  open Js.Typed_array;
  let localToWorldMatrices = (_getTransformData state).localToWorldMatrices;
  let index = getMatrix4DataIndex transform;
  (
    Float32Array.unsafe_get localToWorldMatrices (index + 12),
    Float32Array.unsafe_get localToWorldMatrices (index + 13),
    Float32Array.unsafe_get localToWorldMatrices (index + 14)
  )
};

let setPosition (transform: transform) (position: position) (state: StateDataType.state) => {
  let transformData = _getTransformData state;
  TransformOperateDataSystem.setPosition
    (getVector3DataIndex transform)
    (TransformHierachySystem.getParent (Js.Int.toString transform) transformData)
    position
    transformData
  |> ignore;
  addItAndItsChildrenToDirtyList transform transformData |> ignore;
  state
};

let init (state: StateDataType.state) => update state;

let handleAddComponent (transform: transform) (gameObjectUId: string) (state: StateDataType.state) => {
  let transformData = _getTransformData state;
  addComponentToGameObjectMap transform gameObjectUId transformData.gameObjectMap |> ignore;
  state
};

let getGameObject (transform: transform) (state: StateDataType.state) => {
  let transformData = _getTransformData state;
  getComponentGameObject transform transformData.gameObjectMap
};

let initData (state: StateDataType.state) => {
  let maxCount = getMaxCount state;
  let (buffer, localPositions, localToWorldMatrices) = _initBufferData maxCount;
  state.transformData =
    Some (
      {
        buffer,
        localToWorldMatrices,
        localPositions,
        index: 0,
        /* firstDirtyIndex: getMaxCount (), */
        /* oldIndexListBeforeAddToDirtyList: ArraySystem.createEmpty (), */
        parentMap: HashMapSystem.createEmpty (),
        childMap: HashMapSystem.createEmpty (),
        gameObjectMap: HashMapSystem.createEmpty (),
        /* originToMoveIndexMap: HashMapSystem.createEmpty (), */
        /* moveToOriginIndexMap: HashMapSystem.createEmpty () */
        dirtyList: ArraySystem.createEmpty ()
      }
      |> _setDefaultChildren maxCount
    );
  state
};
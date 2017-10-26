open StateDataType;

open ComponentType;
let addComponentToGameObjectMap
    (component: component)
    (gameObjectUId: string)
    (gameObjectMap) => {
  HashMapSystem.set (Js.Int.toString component) gameObjectUId gameObjectMap |> ignore;
};

let getComponentGameObject (component: component) gameObjectMap =>
  HashMapSystem.get gameObjectMap (Js.Int.toString component);
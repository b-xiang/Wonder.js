open Js.Typed_array;

let _getPosition = (vertices, vIndex) => (
  Float32Array.unsafe_get(vertices, vIndex),
  Float32Array.unsafe_get(vertices, vIndex + 1),
  Float32Array.unsafe_get(vertices, vIndex + 2),
);

let _setNormal = ((faceNormalX, faceNormalY, faceNormalZ), vIndex, normals) => {
  Float32Array.unsafe_set(
    normals,
    vIndex,
    Float32Array.unsafe_get(normals, vIndex) +. faceNormalX,
  );
  Float32Array.unsafe_set(
    normals,
    vIndex + 1,
    Float32Array.unsafe_get(normals, vIndex + 1) +. faceNormalY,
  );
  Float32Array.unsafe_set(
    normals,
    vIndex + 2,
    Float32Array.unsafe_get(normals, vIndex + 2) +. faceNormalZ,
  );
  normals;
};

let _normalizeNormals = normals => {
  let len = normals |> Float32Array.length;
  let rec _normalized = (index, normals) =>
    index >= len ?
      normals :
      {
        let x = Float32Array.unsafe_get(normals, index);
        let y = Float32Array.unsafe_get(normals, index + 1);
        let z = Float32Array.unsafe_get(normals, index + 2);
        let d = Js.Math.sqrt(x *. x +. y *. y +. z *. z);
        d === 0. ?
          {
            Float32Array.unsafe_set(normals, index, 0.);
            Float32Array.unsafe_set(normals, index + 1, 0.);
            Float32Array.unsafe_set(normals, index + 2, 0.);
          } :
          {
            Float32Array.unsafe_set(normals, index, x /. d);
            Float32Array.unsafe_set(normals, index + 1, y /. d);
            Float32Array.unsafe_set(normals, index + 2, z /. d);
          };
        _normalized(index + 3, normals);
      };
  _normalized(0, normals);
};

let _createDefaultNormals = count => Float32Array.fromLength(count);

let computeVertexNormals = (vertices, indices) => {
  let rec _compute = (indicesLen, index, normals) =>
    index >= indicesLen ?
      normals :
      {
        let va = AbstractIndicesService.unsafeGetIndex(index, indices) * 3;
        let vb =
          AbstractIndicesService.unsafeGetIndex(index + 1, indices) * 3;
        let vc =
          AbstractIndicesService.unsafeGetIndex(index + 2, indices) * 3;
        let pa = _getPosition(vertices, va);
        let pb = _getPosition(vertices, vb);
        let pc = _getPosition(vertices, vc);
        let v0 = Vector3Service.sub(Float, pc, pb);
        let v1 = Vector3Service.sub(Float, pa, pb);
        let (faceNormalX, faceNormalY, faceNormalZ) as faceNormalTuple =
          Vector3Service.cross(v0, v1);
        _compute(
          indicesLen,
          index + 3,
          normals
          |> _setNormal(faceNormalTuple, va)
          |> _setNormal(faceNormalTuple, vb)
          |> _setNormal(faceNormalTuple, vc),
        );
      };

  _compute(
    AbstractIndicesService.getIndicesLength(indices),
    0,
    _createDefaultNormals(vertices |> Float32Array.length),
  )
  |> _normalizeNormals;
};
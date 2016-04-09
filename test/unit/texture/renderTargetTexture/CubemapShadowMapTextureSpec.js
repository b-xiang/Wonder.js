describe("CubemapShadowMapTexture", function() {
    var sandbox = null;
    var Texture = null;
    var texture = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Texture = wd.CubemapShadowMapTexture;
        texture = new Texture();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("sendData", function () {
        var program;

        beforeEach(function () {
            program = {
                sendUniformData: sandbox.stub(),
                getUniformLocation: sandbox.stub(),
                isUniformDataNotExistByLocation: sandbox.stub().returns(false)
            };
        });

        it("send map sampler to array", function () {
            var pos1 = 100,
                pos2 = 200;
            program.getUniformLocation.onCall(1).returns(pos1);
            program.getUniformLocation.onCall(2).returns(pos2);
            var map = new wd.ImageTexture();
            var material = wd.LightMaterial.create();
            material.diffuseMap = map;

            material.mapManager.addCubemapShadowMap(texture);

            var texture2 = new Texture();
            material.mapManager.addCubemapShadowMap(texture2);

            material.mapManager.sendData(program);

            expect(program.sendUniformData).toCalledWith("u_cubemapShadowMapSampler[0]", wd.EVariableType.SAMPLER_CUBE, 0);
            expect(program.sendUniformData).toCalledWith("u_cubemapShadowMapSampler[1]", wd.EVariableType.SAMPLER_CUBE, 1);
        });
    });
});


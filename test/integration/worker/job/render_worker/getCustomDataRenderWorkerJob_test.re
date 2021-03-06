open Wonder_jest;

open Js.Promise;

open WonderImgui.IMGUIType;

let _ =
  describe("test get custom data render worker job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => TestWorkerTool.clear(sandbox));

    describe("test send render data to render worker", () => {
      let _prepare = () =>
        SendRenderDataMainWorkerTool.prepareForTestSendRenderData(sandbox);

      testPromise("send customData", () => {
        let (state, postMessageToRenderWorker) = _prepare();
        let customData = 100;
        let state = WorkerDataAPI.setMainWorkerCustomData(customData, state);
        MainStateTool.setState(state);

        WorkerJobWorkerTool.execMainWorkerJob(
          ~execJobFunc=SendRenderDataMainWorkerJob.execJob,
          ~completeFunc=
            _ =>
              postMessageToRenderWorker
              |> expect
              |> toCalledWith([|
                   SendRenderRenderDataWorkerTool.buildRenderRenderData(
                     ~customData,
                     (),
                   ),
                 |])
              |> resolve,
          (),
        );
      });
    });

    describe("test render worker job", () =>
      testPromise("get customData", () => {
        let state = TestMainWorkerTool.initWithJobConfig(~sandbox, ());
        let state =
          state
          |> FakeGlWorkerTool.setFakeGl(
               FakeGlWorkerTool.buildFakeGl(~sandbox, ()),
             );
        let customData = 100;
        let state = WorkerDataAPI.setMainWorkerCustomData(customData, state);
        MainStateTool.setState(state);

        RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
          ~state,
          ~sandbox,
          ~completeFunc=
            _ => {
              let renderWorkerState = RenderWorkerStateTool.unsafeGetState();

              OperateCustomRenderWorkerService.getCustomDataFromMainWorkerToRenderWorker(
                renderWorkerState,
              )
              |> Obj.magic
              |> expect == customData
              |> resolve;
            },
          (),
        );
      })
    );
  });
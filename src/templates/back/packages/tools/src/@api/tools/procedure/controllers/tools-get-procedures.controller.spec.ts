import { ToolsGetProceduresController, ToolsGetProceduresHandler } from '@api/tools/procedure';
import { toolsMockProcedureData } from '@app/tools/procedure';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsGetProceduresController', () =>
{
    let controller: ToolsGetProceduresController;
    let handler: ToolsGetProceduresHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                ToolsGetProceduresController,
            ],
            providers: [
                {
                    provide : ToolsGetProceduresHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<ToolsGetProceduresController>(ToolsGetProceduresController);
        handler = module.get<ToolsGetProceduresHandler>(ToolsGetProceduresHandler);
    });

    describe('main', () =>
    {
        test('ToolsGetProceduresController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a toolsMockProcedureData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(toolsMockProcedureData)));
            expect(await controller.main()).toBe(toolsMockProcedureData);
        });
    });
});

import { ToolsFindProcedureController, ToolsFindProcedureHandler } from '@api/tools/procedure';
import { toolsMockProcedureData } from '@app/tools/procedure';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindProcedureController', () =>
{
    let controller: ToolsFindProcedureController;
    let handler: ToolsFindProcedureHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                ToolsFindProcedureController,
            ],
            providers: [
                {
                    provide : ToolsFindProcedureHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<ToolsFindProcedureController>(ToolsFindProcedureController);
        handler = module.get<ToolsFindProcedureHandler>(ToolsFindProcedureHandler);
    });

    describe('main', () =>
    {
        test('ToolsFindProcedureController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a procedure', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(toolsMockProcedureData[0])));
            expect(await controller.main()).toBe(toolsMockProcedureData[0]);
        });
    });
});

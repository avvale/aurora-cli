import {
    ToolsDeleteProceduresController,
    ToolsDeleteProceduresHandler,
} from '@api/tools/procedure';
import { toolsMockProcedureData } from '@app/tools/procedure';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteProceduresController', () => {
    let controller: ToolsDeleteProceduresController;
    let handler: ToolsDeleteProceduresHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [ToolsDeleteProceduresController],
            providers: [
                {
                    provide: ToolsDeleteProceduresHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<ToolsDeleteProceduresController>(
            ToolsDeleteProceduresController,
        );
        handler = module.get<ToolsDeleteProceduresHandler>(
            ToolsDeleteProceduresHandler,
        );
    });

    describe('main', () => {
        test('ToolsDeleteProceduresController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an toolsMockProcedureData deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(toolsMockProcedureData)),
            );
            expect(await controller.main()).toBe(toolsMockProcedureData);
        });
    });
});

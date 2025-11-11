import {
    ToolsCreateProceduresController,
    ToolsCreateProceduresHandler,
} from '@api/tools/procedure';
import { toolsMockProcedureData } from '@app/tools/procedure';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateProceduresController', () => {
    let controller: ToolsCreateProceduresController;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ToolsCreateProceduresController],
            providers: [
                {
                    provide: ToolsCreateProceduresHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<ToolsCreateProceduresController>(
            ToolsCreateProceduresController,
        );
    });

    describe('main', () => {
        test('ToolsCreateProceduresController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an toolsMockProcedureData created', async () => {
            expect(await controller.main(toolsMockProcedureData)).toBe(
                undefined,
            );
        });
    });
});

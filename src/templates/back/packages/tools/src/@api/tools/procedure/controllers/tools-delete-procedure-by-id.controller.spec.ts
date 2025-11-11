/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ToolsDeleteProcedureByIdController,
    ToolsDeleteProcedureByIdHandler,
} from '@api/tools/procedure';
import { toolsMockProcedureData } from '@app/tools/procedure';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteProcedureByIdController', () => {
    let controller: ToolsDeleteProcedureByIdController;
    let handler: ToolsDeleteProcedureByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [ToolsDeleteProcedureByIdController],
            providers: [
                {
                    provide: ToolsDeleteProcedureByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<ToolsDeleteProcedureByIdController>(
            ToolsDeleteProcedureByIdController,
        );
        handler = module.get<ToolsDeleteProcedureByIdHandler>(
            ToolsDeleteProcedureByIdHandler,
        );
    });

    describe('main', () => {
        test('ToolsDeleteProcedureByIdController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an procedure deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(toolsMockProcedureData[0]),
                    ),
            );
            expect(await controller.main(toolsMockProcedureData[0].id)).toBe(
                toolsMockProcedureData[0],
            );
        });
    });
});

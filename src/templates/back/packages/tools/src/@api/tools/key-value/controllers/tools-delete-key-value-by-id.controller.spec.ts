/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ToolsDeleteKeyValueByIdController,
    ToolsDeleteKeyValueByIdHandler,
} from '@api/tools/key-value';
import { toolsMockKeyValueData } from '@app/tools/key-value';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteKeyValueByIdController', () => {
    let controller: ToolsDeleteKeyValueByIdController;
    let handler: ToolsDeleteKeyValueByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [ToolsDeleteKeyValueByIdController],
            providers: [
                {
                    provide: ToolsDeleteKeyValueByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<ToolsDeleteKeyValueByIdController>(
            ToolsDeleteKeyValueByIdController,
        );
        handler = module.get<ToolsDeleteKeyValueByIdHandler>(
            ToolsDeleteKeyValueByIdHandler,
        );
    });

    describe('main', () => {
        test('ToolsDeleteKeyValueByIdController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an keyValue deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(toolsMockKeyValueData[0])),
            );
            expect(await controller.main(toolsMockKeyValueData[0].id)).toBe(
                toolsMockKeyValueData[0],
            );
        });
    });
});

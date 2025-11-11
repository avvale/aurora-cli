import {
    ToolsFindKeyValueController,
    ToolsFindKeyValueHandler,
} from '@api/tools/key-value';
import { toolsMockKeyValueData } from '@app/tools/key-value';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindKeyValueController', () => {
    let controller: ToolsFindKeyValueController;
    let handler: ToolsFindKeyValueHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [ToolsFindKeyValueController],
            providers: [
                {
                    provide: ToolsFindKeyValueHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<ToolsFindKeyValueController>(
            ToolsFindKeyValueController,
        );
        handler = module.get<ToolsFindKeyValueHandler>(
            ToolsFindKeyValueHandler,
        );
    });

    describe('main', () => {
        test('ToolsFindKeyValueController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a keyValue', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(toolsMockKeyValueData[0])),
            );
            expect(await controller.main()).toBe(toolsMockKeyValueData[0]);
        });
    });
});

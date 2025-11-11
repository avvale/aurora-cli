import {
    ToolsPaginateKeyValuesController,
    ToolsPaginateKeyValuesHandler,
} from '@api/tools/key-value';
import { toolsMockKeyValueData } from '@app/tools/key-value';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsPaginateKeyValuesController', () => {
    let controller: ToolsPaginateKeyValuesController;
    let handler: ToolsPaginateKeyValuesHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [ToolsPaginateKeyValuesController],
            providers: [
                {
                    provide: ToolsPaginateKeyValuesHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<ToolsPaginateKeyValuesController>(
            ToolsPaginateKeyValuesController,
        );
        handler = module.get<ToolsPaginateKeyValuesHandler>(
            ToolsPaginateKeyValuesHandler,
        );
    });

    describe('main', () => {
        test('ToolsPaginateKeyValuesController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a toolsMockKeyValueData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: 5,
                            count: 5,
                            rows: toolsMockKeyValueData,
                        }),
                    ),
            );
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows: toolsMockKeyValueData,
            });
        });
    });
});

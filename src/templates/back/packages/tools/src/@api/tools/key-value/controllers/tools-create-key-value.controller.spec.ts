import { ToolsCreateKeyValueController, ToolsCreateKeyValueHandler } from '@api/tools/key-value';
import { toolsMockKeyValueData } from '@app/tools/key-value';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateKeyValueController', () =>
{
    let controller: ToolsCreateKeyValueController;
    let handler: ToolsCreateKeyValueHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                ToolsCreateKeyValueController,
            ],
            providers: [
                {
                    provide : ToolsCreateKeyValueHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<ToolsCreateKeyValueController>(ToolsCreateKeyValueController);
        handler = module.get<ToolsCreateKeyValueHandler>(ToolsCreateKeyValueHandler);
    });

    describe('main', () =>
    {
        test('ToolsCreateKeyValueController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an keyValue created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(toolsMockKeyValueData[0])));
            expect(
                await controller.main(
                    toolsMockKeyValueData[0],
                ),
            )
                .toBe(toolsMockKeyValueData[0]);
        });
    });
});

import { ToolsDeleteKeyValuesController, ToolsDeleteKeyValuesHandler } from '@api/tools/key-value';
import { toolsMockKeyValueData } from '@app/tools/key-value';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteKeyValuesController', () =>
{
    let controller: ToolsDeleteKeyValuesController;
    let handler: ToolsDeleteKeyValuesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                ToolsDeleteKeyValuesController,
            ],
            providers: [
                {
                    provide : ToolsDeleteKeyValuesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<ToolsDeleteKeyValuesController>(ToolsDeleteKeyValuesController);
        handler = module.get<ToolsDeleteKeyValuesHandler>(ToolsDeleteKeyValuesHandler);
    });

    describe('main', () =>
    {
        test('ToolsDeleteKeyValuesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an toolsMockKeyValueData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(toolsMockKeyValueData)));
            expect(await controller.main()).toBe(toolsMockKeyValueData);
        });
    });
});

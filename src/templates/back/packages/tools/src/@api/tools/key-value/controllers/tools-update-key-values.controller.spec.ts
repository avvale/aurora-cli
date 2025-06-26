import { ToolsUpdateKeyValuesController, ToolsUpdateKeyValuesHandler } from '@api/tools/key-value';
import { toolsMockKeyValueData } from '@app/tools/key-value';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateKeyValuesController', () =>
{
    let controller: ToolsUpdateKeyValuesController;
    let handler: ToolsUpdateKeyValuesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                ToolsUpdateKeyValuesController,
            ],
            providers: [
                {
                    provide : ToolsUpdateKeyValuesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<ToolsUpdateKeyValuesController>(ToolsUpdateKeyValuesController);
        handler = module.get<ToolsUpdateKeyValuesHandler>(ToolsUpdateKeyValuesHandler);
    });

    describe('main', () =>
    {
        test('ToolsUpdateKeyValuesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a keyValues updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(toolsMockKeyValueData[0])));
            expect(await controller.main(toolsMockKeyValueData[0])).toBe(toolsMockKeyValueData[0]);
        });
    });
});

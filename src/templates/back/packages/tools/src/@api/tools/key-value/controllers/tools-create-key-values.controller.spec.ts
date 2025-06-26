import { ToolsCreateKeyValuesController, ToolsCreateKeyValuesHandler } from '@api/tools/key-value';
import { toolsMockKeyValueData } from '@app/tools/key-value';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateKeyValuesController', () =>
{
    let controller: ToolsCreateKeyValuesController;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                ToolsCreateKeyValuesController,
            ],
            providers: [
                {
                    provide : ToolsCreateKeyValuesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<ToolsCreateKeyValuesController>(ToolsCreateKeyValuesController);
    });

    describe('main', () =>
    {
        test('ToolsCreateKeyValuesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an toolsMockKeyValueData created', async () =>
        {
            expect(
                await controller.main(
                    toolsMockKeyValueData,
                ),
            )
                .toBe(undefined);
        });
    });
});

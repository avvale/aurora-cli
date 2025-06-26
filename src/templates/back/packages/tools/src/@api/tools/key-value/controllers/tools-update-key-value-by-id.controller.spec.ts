import { ToolsUpdateKeyValueByIdController, ToolsUpdateKeyValueByIdHandler } from '@api/tools/key-value';
import { toolsMockKeyValueData } from '@app/tools/key-value';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateKeyValueByIdController', () =>
{
    let controller: ToolsUpdateKeyValueByIdController;
    let handler: ToolsUpdateKeyValueByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                ToolsUpdateKeyValueByIdController,
            ],
            providers: [
                {
                    provide : ToolsUpdateKeyValueByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<ToolsUpdateKeyValueByIdController>(ToolsUpdateKeyValueByIdController);
        handler = module.get<ToolsUpdateKeyValueByIdHandler>(ToolsUpdateKeyValueByIdHandler);
    });

    describe('main', () =>
    {
        test('ToolsUpdateKeyValueByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a keyValue updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(toolsMockKeyValueData[0])));
            expect(await controller.main(toolsMockKeyValueData[0])).toBe(toolsMockKeyValueData[0]);
        });
    });
});

import { toolsMockKeyValueData, ToolsUpdateKeyValuesCommand } from '@app/tools/key-value';
import { ToolsUpdateKeyValuesCommandHandler } from '@app/tools/key-value/application/update/tools-update-key-values.command-handler';
import { ToolsUpdateKeyValuesService } from '@app/tools/key-value/application/update/tools-update-key-values.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateKeyValuesCommandHandler', () =>
{
    let commandHandler: ToolsUpdateKeyValuesCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsUpdateKeyValuesCommandHandler,
                {
                    provide : ToolsUpdateKeyValuesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<ToolsUpdateKeyValuesCommandHandler>(ToolsUpdateKeyValuesCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateKeyValuesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an keyValues updated', async () =>
        {
            expect(await commandHandler.execute(
                new ToolsUpdateKeyValuesCommand(
                    {
                        id: toolsMockKeyValueData[0].id,
                        key: toolsMockKeyValueData[0].key,
                        type: toolsMockKeyValueData[0].type,
                        value: toolsMockKeyValueData[0].value,
                        isActive: toolsMockKeyValueData[0].isActive,
                        description: toolsMockKeyValueData[0].description,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});

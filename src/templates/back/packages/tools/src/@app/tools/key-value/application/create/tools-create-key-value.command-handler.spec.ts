import { ToolsCreateKeyValueCommandHandler } from './tools-create-key-value.command-handler';
import { ToolsCreateKeyValueService } from './tools-create-key-value.service';
import { ToolsCreateKeyValueCommand, toolsMockKeyValueData } from '@app/tools/key-value';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateKeyValueCommandHandler', () =>
{
    let commandHandler: ToolsCreateKeyValueCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsCreateKeyValueCommandHandler,
                {
                    provide : ToolsCreateKeyValueService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<ToolsCreateKeyValueCommandHandler>(ToolsCreateKeyValueCommandHandler);
    });

    describe('main', () =>
    {
        test('CreateKeyValueCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the ToolsCreateKeyValueService', async () =>
        {
            expect(await commandHandler.execute(
                new ToolsCreateKeyValueCommand(
                    {
                        id: toolsMockKeyValueData[0].id,
                        key: toolsMockKeyValueData[0].key,
                        type: toolsMockKeyValueData[0].type,
                        value: toolsMockKeyValueData[0].value,
                        isActive: toolsMockKeyValueData[0].isActive,
                        description: toolsMockKeyValueData[0].description,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});

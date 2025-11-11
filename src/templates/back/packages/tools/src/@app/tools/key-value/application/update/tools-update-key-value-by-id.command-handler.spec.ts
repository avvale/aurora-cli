import {
    toolsMockKeyValueData,
    ToolsUpdateKeyValueByIdCommand,
} from '@app/tools/key-value';
import { ToolsUpdateKeyValueByIdCommandHandler } from '@app/tools/key-value/application/update/tools-update-key-value-by-id.command-handler';
import { ToolsUpdateKeyValueByIdService } from '@app/tools/key-value/application/update/tools-update-key-value-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateKeyValueByIdCommandHandler', () => {
    let commandHandler: ToolsUpdateKeyValueByIdCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsUpdateKeyValueByIdCommandHandler,
                {
                    provide: ToolsUpdateKeyValueByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<ToolsUpdateKeyValueByIdCommandHandler>(
            ToolsUpdateKeyValueByIdCommandHandler,
        );
    });

    describe('main', () => {
        test('UpdateKeyValueByIdCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return an keyValue created', async () => {
            expect(
                await commandHandler.execute(
                    new ToolsUpdateKeyValueByIdCommand(
                        {
                            id: toolsMockKeyValueData[0].id,
                            rowId: toolsMockKeyValueData[0].rowId,
                            key: toolsMockKeyValueData[0].key,
                            type: toolsMockKeyValueData[0].type,
                            value: toolsMockKeyValueData[0].value,
                            isActive: toolsMockKeyValueData[0].isActive,
                            description: toolsMockKeyValueData[0].description,
                        },
                        {},
                        { timezone: process.env.TZ },
                    ),
                ),
            ).toBe(undefined);
        });
    });
});

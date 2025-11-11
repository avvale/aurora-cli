import {
    ToolsDeleteKeyValueByIdCommand,
    toolsMockKeyValueData,
} from '@app/tools/key-value';
import { ToolsDeleteKeyValueByIdCommandHandler } from '@app/tools/key-value/application/delete/tools-delete-key-value-by-id.command-handler';
import { ToolsDeleteKeyValueByIdService } from '@app/tools/key-value/application/delete/tools-delete-key-value-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteKeyValueByIdCommandHandler', () => {
    let commandHandler: ToolsDeleteKeyValueByIdCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsDeleteKeyValueByIdCommandHandler,
                {
                    provide: ToolsDeleteKeyValueByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<ToolsDeleteKeyValueByIdCommandHandler>(
            ToolsDeleteKeyValueByIdCommandHandler,
        );
    });

    describe('main', () => {
        test('ToolsDeleteKeyValueByIdCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the ToolsDeleteKeyValueByIdService', async () => {
            expect(
                await commandHandler.execute(
                    new ToolsDeleteKeyValueByIdCommand(
                        toolsMockKeyValueData[0].id,
                    ),
                ),
            ).toBe(undefined);
        });
    });
});

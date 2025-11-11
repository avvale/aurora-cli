import { ToolsDeleteKeyValuesCommand } from '@app/tools/key-value';
import { ToolsDeleteKeyValuesCommandHandler } from '@app/tools/key-value/application/delete/tools-delete-key-values.command-handler';
import { ToolsDeleteKeyValuesService } from '@app/tools/key-value/application/delete/tools-delete-key-values.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteKeyValuesCommandHandler', () => {
    let commandHandler: ToolsDeleteKeyValuesCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsDeleteKeyValuesCommandHandler,
                {
                    provide: ToolsDeleteKeyValuesService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<ToolsDeleteKeyValuesCommandHandler>(
            ToolsDeleteKeyValuesCommandHandler,
        );
    });

    describe('main', () => {
        test('ToolsDeleteKeyValuesCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () => {
            expect(
                await commandHandler.execute(new ToolsDeleteKeyValuesCommand()),
            ).toBe(undefined);
        });
    });
});

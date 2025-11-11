import {
    ToolsDeleteProcedureByIdCommand,
    toolsMockProcedureData,
} from '@app/tools/procedure';
import { ToolsDeleteProcedureByIdCommandHandler } from '@app/tools/procedure/application/delete/tools-delete-procedure-by-id.command-handler';
import { ToolsDeleteProcedureByIdService } from '@app/tools/procedure/application/delete/tools-delete-procedure-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteProcedureByIdCommandHandler', () => {
    let commandHandler: ToolsDeleteProcedureByIdCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsDeleteProcedureByIdCommandHandler,
                {
                    provide: ToolsDeleteProcedureByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<ToolsDeleteProcedureByIdCommandHandler>(
            ToolsDeleteProcedureByIdCommandHandler,
        );
    });

    describe('main', () => {
        test('ToolsDeleteProcedureByIdCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the ToolsDeleteProcedureByIdService', async () => {
            expect(
                await commandHandler.execute(
                    new ToolsDeleteProcedureByIdCommand(
                        toolsMockProcedureData[0].id,
                    ),
                ),
            ).toBe(undefined);
        });
    });
});

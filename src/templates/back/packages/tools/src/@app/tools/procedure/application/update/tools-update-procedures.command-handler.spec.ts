import {
    toolsMockProcedureData,
    ToolsUpdateProceduresCommand,
} from '@app/tools/procedure';
import { ToolsUpdateProceduresCommandHandler } from '@app/tools/procedure/application/update/tools-update-procedures.command-handler';
import { ToolsUpdateProceduresService } from '@app/tools/procedure/application/update/tools-update-procedures.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateProceduresCommandHandler', () => {
    let commandHandler: ToolsUpdateProceduresCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsUpdateProceduresCommandHandler,
                {
                    provide: ToolsUpdateProceduresService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<ToolsUpdateProceduresCommandHandler>(
            ToolsUpdateProceduresCommandHandler,
        );
    });

    describe('main', () => {
        test('UpdateProceduresCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return an procedures updated', async () => {
            expect(
                await commandHandler.execute(
                    new ToolsUpdateProceduresCommand(
                        {
                            id: toolsMockProcedureData[0].id,
                            rowId: toolsMockProcedureData[0].rowId,
                            name: toolsMockProcedureData[0].name,
                            type: toolsMockProcedureData[0].type,
                            version: toolsMockProcedureData[0].version,
                            isActive: toolsMockProcedureData[0].isActive,
                            isExecuted: toolsMockProcedureData[0].isExecuted,
                            isUpdated: toolsMockProcedureData[0].isUpdated,
                            upScript: toolsMockProcedureData[0].upScript,
                            downScript: toolsMockProcedureData[0].downScript,
                            sort: toolsMockProcedureData[0].sort,
                            hash: toolsMockProcedureData[0].hash,
                            executedAt: toolsMockProcedureData[0].executedAt,
                            checkedAt: toolsMockProcedureData[0].checkedAt,
                        },
                        {},
                        {},
                        { timezone: process.env.TZ },
                    ),
                ),
            ).toBe(undefined);
        });
    });
});

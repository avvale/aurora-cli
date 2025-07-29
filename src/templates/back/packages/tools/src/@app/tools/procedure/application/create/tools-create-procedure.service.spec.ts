/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsIProcedureRepository, toolsMockProcedureData, ToolsMockProcedureRepository } from '@app/tools/procedure';
import { ToolsCreateProcedureService } from '@app/tools/procedure/application/create/tools-create-procedure.service';
import {
    ToolsProcedureCheckedAt,
    ToolsProcedureDownScript,
    ToolsProcedureExecutedAt,
    ToolsProcedureHash,
    ToolsProcedureId,
    ToolsProcedureIsActive,
    ToolsProcedureIsExecuted,
    ToolsProcedureIsUpdated,
    ToolsProcedureName,
    ToolsProcedureSort,
    ToolsProcedureType,
    ToolsProcedureUpScript,
    ToolsProcedureVersion,
} from '@app/tools/procedure/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateProcedureService', () =>

{
    let service: ToolsCreateProcedureService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                ToolsCreateProcedureService,
                ToolsMockProcedureRepository,
                {
                    provide : ToolsIProcedureRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(ToolsCreateProcedureService);
    });

    describe('main', () =>
    {
        test('ToolsCreateProcedureService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a procedure and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new ToolsProcedureId(toolsMockProcedureData[0].id),
                        name: new ToolsProcedureName(toolsMockProcedureData[0].name),
                        type: new ToolsProcedureType(toolsMockProcedureData[0].type),
                        version: new ToolsProcedureVersion(toolsMockProcedureData[0].version),
                        isActive: new ToolsProcedureIsActive(toolsMockProcedureData[0].isActive),
                        isExecuted: new ToolsProcedureIsExecuted(toolsMockProcedureData[0].isExecuted),
                        isUpdated: new ToolsProcedureIsUpdated(toolsMockProcedureData[0].isUpdated),
                        upScript: new ToolsProcedureUpScript(toolsMockProcedureData[0].upScript),
                        downScript: new ToolsProcedureDownScript(toolsMockProcedureData[0].downScript),
                        sort: new ToolsProcedureSort(toolsMockProcedureData[0].sort),
                        hash: new ToolsProcedureHash(toolsMockProcedureData[0].hash),
                        executedAt: new ToolsProcedureExecutedAt(toolsMockProcedureData[0].executedAt),
                        checkedAt: new ToolsProcedureCheckedAt(toolsMockProcedureData[0].checkedAt),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});

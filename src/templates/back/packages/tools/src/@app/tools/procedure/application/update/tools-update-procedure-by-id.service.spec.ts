/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsIProcedureRepository, toolsMockProcedureData, ToolsMockProcedureRepository } from '@app/tools/procedure';
import { ToolsUpdateProcedureByIdService } from '@app/tools/procedure/application/update/tools-update-procedure-by-id.service';
import {
    ToolsProcedureCheckedAt,
    ToolsProcedureDownScript,
    ToolsProcedureExecutedAt,
    ToolsProcedureId,
    ToolsProcedureIsActive,
    ToolsProcedureIsInstalled,
    ToolsProcedureIsUpdated,
    ToolsProcedureName,
    ToolsProcedureSort,
    ToolsProcedureType,
    ToolsProcedureUpScript,
    ToolsProcedureVersion,
} from '@app/tools/procedure/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateProcedureByIdService', () =>
{
    let service: ToolsUpdateProcedureByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                ToolsUpdateProcedureByIdService,
                ToolsMockProcedureRepository,
                {
                    provide : ToolsIProcedureRepository,
                    useValue: {
                        updateById: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(ToolsUpdateProcedureByIdService);
    });

    describe('main', () =>
    {
        test('ToolsUpdateProcedureByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a procedure and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new ToolsProcedureId(toolsMockProcedureData[0].id),
                        name: new ToolsProcedureName(toolsMockProcedureData[0].name),
                        type: new ToolsProcedureType(toolsMockProcedureData[0].type),
                        version: new ToolsProcedureVersion(toolsMockProcedureData[0].version),
                        isActive: new ToolsProcedureIsActive(toolsMockProcedureData[0].isActive),
                        isInstalled: new ToolsProcedureIsInstalled(toolsMockProcedureData[0].isInstalled),
                        isUpdated: new ToolsProcedureIsUpdated(toolsMockProcedureData[0].isUpdated),
                        upScript: new ToolsProcedureUpScript(toolsMockProcedureData[0].upScript),
                        downScript: new ToolsProcedureDownScript(toolsMockProcedureData[0].downScript),
                        sort: new ToolsProcedureSort(toolsMockProcedureData[0].sort),
                        executedAt: new ToolsProcedureExecutedAt(toolsMockProcedureData[0].executedAt),
                        checkedAt: new ToolsProcedureCheckedAt(toolsMockProcedureData[0].checkedAt),
                    },
                    {},
                ),
            ).toBe(undefined);
        });
    });
});

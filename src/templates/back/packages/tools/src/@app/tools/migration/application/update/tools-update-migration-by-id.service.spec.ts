/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsIMigrationRepository, toolsMockMigrationData, ToolsMockMigrationRepository } from '@app/tools/migration';
import { ToolsUpdateMigrationByIdService } from '@app/tools/migration/application/update/tools-update-migration-by-id.service';
import {
    ToolsMigrationDownScript,
    ToolsMigrationExecutedAt,
    ToolsMigrationId,
    ToolsMigrationIsActive,
    ToolsMigrationIsExecuted,
    ToolsMigrationName,
    ToolsMigrationSort,
    ToolsMigrationUpScript,
    ToolsMigrationVersion,
} from '@app/tools/migration/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateMigrationByIdService', () =>
{
    let service: ToolsUpdateMigrationByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                ToolsUpdateMigrationByIdService,
                ToolsMockMigrationRepository,
                {
                    provide : ToolsIMigrationRepository,
                    useValue: {
                        updateById: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(ToolsUpdateMigrationByIdService);
    });

    describe('main', () =>
    {
        test('ToolsUpdateMigrationByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a migration and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new ToolsMigrationId(toolsMockMigrationData[0].id),
                        name: new ToolsMigrationName(toolsMockMigrationData[0].name),
                        version: new ToolsMigrationVersion(toolsMockMigrationData[0].version),
                        isActive: new ToolsMigrationIsActive(toolsMockMigrationData[0].isActive),
                        isExecuted: new ToolsMigrationIsExecuted(toolsMockMigrationData[0].isExecuted),
                        upScript: new ToolsMigrationUpScript(toolsMockMigrationData[0].upScript),
                        downScript: new ToolsMigrationDownScript(toolsMockMigrationData[0].downScript),
                        sort: new ToolsMigrationSort(toolsMockMigrationData[0].sort),
                        executedAt: new ToolsMigrationExecutedAt(toolsMockMigrationData[0].executedAt),
                    },
                    {},
                ),
            ).toBe(undefined);
        });
    });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ToolsIMigrationRepository,
    ToolsMockMigrationRepository,
} from '@app/tools/migration';
import { ToolsDeleteMigrationsService } from '@app/tools/migration/application/delete/tools-delete-migrations.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteMigrationsService', () => {
    let service: ToolsDeleteMigrationsService;
    let repository: ToolsIMigrationRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                ToolsDeleteMigrationsService,
                ToolsMockMigrationRepository,
                {
                    provide: ToolsIMigrationRepository,
                    useValue: {
                        get: () => {
                            /**/
                        },
                        delete: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(ToolsDeleteMigrationsService);
        repository = module.get(ToolsIMigrationRepository);
    });

    describe('main', () => {
        test('ToolsDeleteMigrationsService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should delete migration and emit event', async () => {
            jest.spyOn(repository, 'get').mockImplementation(
                () => new Promise((resolve) => resolve([])),
            );
            expect(await service.main({}, {})).toBe(undefined);
        });
    });
});

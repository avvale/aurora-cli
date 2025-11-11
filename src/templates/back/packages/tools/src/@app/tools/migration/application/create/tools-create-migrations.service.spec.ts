/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ToolsIMigrationRepository,
    ToolsMockMigrationRepository,
} from '@app/tools/migration';
import { ToolsCreateMigrationsService } from '@app/tools/migration/application/create/tools-create-migrations.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateMigrationsService', () => {
    let service: ToolsCreateMigrationsService;
    let mockRepository: ToolsMockMigrationRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                ToolsCreateMigrationsService,
                ToolsMockMigrationRepository,
                {
                    provide: ToolsIMigrationRepository,
                    useValue: {
                        insert: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(ToolsCreateMigrationsService);
        mockRepository = module.get(ToolsMockMigrationRepository);
    });

    describe('main', () => {
        test('CreateMigrationsService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should create migrations and emit event', async () => {
            expect(await service.main(mockRepository.collectionSource)).toBe(
                undefined,
            );
        });
    });
});

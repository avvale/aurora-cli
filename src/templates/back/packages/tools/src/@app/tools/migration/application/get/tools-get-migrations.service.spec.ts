import {
    ToolsIMigrationRepository,
    ToolsMockMigrationRepository,
} from '@app/tools/migration';
import { ToolsGetMigrationsService } from '@app/tools/migration/application/get/tools-get-migrations.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsGetMigrationsService', () => {
    let service: ToolsGetMigrationsService;
    let repository: ToolsIMigrationRepository;
    let mockRepository: ToolsMockMigrationRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                ToolsGetMigrationsService,
                ToolsMockMigrationRepository,
                {
                    provide: ToolsIMigrationRepository,
                    useValue: {
                        get: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(ToolsGetMigrationsService);
        repository = module.get(ToolsIMigrationRepository);
        mockRepository = module.get(ToolsMockMigrationRepository);
    });

    describe('main', () => {
        test('GetMigrationsService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should get migrations', async () => {
            jest.spyOn(repository, 'get').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource),
                    ),
            );
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});

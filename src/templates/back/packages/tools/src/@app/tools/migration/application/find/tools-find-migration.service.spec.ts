import {
    ToolsIMigrationRepository,
    ToolsMockMigrationRepository,
} from '@app/tools/migration';
import { ToolsFindMigrationService } from '@app/tools/migration/application/find/tools-find-migration.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindMigrationService', () => {
    let service: ToolsFindMigrationService;
    let repository: ToolsIMigrationRepository;
    let mockRepository: ToolsMockMigrationRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                ToolsFindMigrationService,
                ToolsMockMigrationRepository,
                {
                    provide: ToolsIMigrationRepository,
                    useValue: {
                        find: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(ToolsFindMigrationService);
        repository = module.get(ToolsIMigrationRepository);
        mockRepository = module.get(ToolsMockMigrationRepository);
    });

    describe('main', () => {
        test('ToolsFindMigrationService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should find migration', async () => {
            jest.spyOn(repository, 'find').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource[0]),
                    ),
            );
            expect(await service.main()).toBe(
                mockRepository.collectionSource[0],
            );
        });
    });
});

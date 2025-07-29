import { ToolsIMigrationRepository, ToolsMockMigrationRepository } from '@app/tools/migration';
import { ToolsPaginateMigrationsService } from '@app/tools/migration/application/paginate/tools-paginate-migrations.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsPaginateMigrationsService', () =>
{
    let service: ToolsPaginateMigrationsService;
    let repository: ToolsIMigrationRepository;
    let mockRepository: ToolsMockMigrationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                ToolsPaginateMigrationsService,
                ToolsMockMigrationRepository,
                {
                    provide : ToolsIMigrationRepository,
                    useValue: {
                        paginate: (queryStatement, constraints) => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(ToolsPaginateMigrationsService);
        repository = module.get(ToolsIMigrationRepository);
        mockRepository = module.get(ToolsMockMigrationRepository);
    });

    describe('main', () =>
    {
        test('ToolsPaginateMigrationsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should paginate migrations', async () =>
        {
            jest.spyOn(repository, 'paginate').mockImplementation(() => new Promise(resolve => resolve({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows : mockRepository.collectionSource.slice(0,10),
            })));
            expect(await service.main({
                offset: 0,
                limit : 10
            })).toStrictEqual({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows : mockRepository.collectionSource.slice(0,10),
            });
        });
    });
});

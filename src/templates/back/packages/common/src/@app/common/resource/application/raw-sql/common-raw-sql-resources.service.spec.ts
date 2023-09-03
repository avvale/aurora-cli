import { CommonIResourceRepository, CommonMockResourceRepository } from '@app/common/resource';
import { CommonRawSQLResourcesService } from '@app/common/resource/application/raw-sql/common-raw-sql-resources.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonRawSQLResourcesService ', () =>
{
    let service: CommonRawSQLResourcesService ;
    let repository: CommonIResourceRepository;
    let mockRepository: CommonMockResourceRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonRawSQLResourcesService ,
                CommonMockResourceRepository,
                {
                    provide : CommonIResourceRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(CommonRawSQLResourcesService );
        repository      = module.get(CommonIResourceRepository);
        mockRepository  = module.get(CommonMockResourceRepository);
    });

    describe('main', () =>
    {
        test('RawSQLResourcesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get resources', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});

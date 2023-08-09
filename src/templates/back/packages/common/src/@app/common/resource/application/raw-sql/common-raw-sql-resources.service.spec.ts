import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { CommonRawSQLResourcesService } from './common-raw-sql-resources.service';
import { CommonIResourceRepository } from '../../domain/common-resource.repository';
import { CommonMockResourceRepository } from '../../infrastructure/mock/common-mock-resource.repository';

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

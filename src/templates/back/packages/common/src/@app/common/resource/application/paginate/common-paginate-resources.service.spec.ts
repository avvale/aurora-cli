import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { CommonPaginateResourcesService } from './common-paginate-resources.service';
import { CommonIResourceRepository } from '../../domain/common-resource.repository';
import { CommonMockResourceRepository } from '../../infrastructure/mock/common-mock-resource.repository';

describe('CommonPaginateResourcesService', () =>
{
    let service: CommonPaginateResourcesService;
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
                CommonPaginateResourcesService,
                CommonMockResourceRepository,
                {
                    provide : CommonIResourceRepository,
                    useValue: {
                        paginate: (queryStatement, constraints) => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonPaginateResourcesService);
        repository = module.get(CommonIResourceRepository);
        mockRepository = module.get(CommonMockResourceRepository);
    });

    describe('main', () =>
    {
        test('CommonPaginateResourcesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should paginate resources', async () =>
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

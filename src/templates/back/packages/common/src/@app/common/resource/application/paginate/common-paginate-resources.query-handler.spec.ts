import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { CommonPaginateResourcesQueryHandler } from './common-paginate-resources.query-handler';
import { CommonMockResourceRepository } from '@app/common/resource/infrastructure/mock/common-mock-resource.repository';
import { CommonIResourceRepository } from '@app/common/resource/domain/common-resource.repository';
import { CommonResourceMapper } from '@app/common/resource/domain/common-resource.mapper';
import { CommonPaginateResourcesQuery } from './common-paginate-resources.query';
import { CommonPaginateResourcesService } from './common-paginate-resources.service';

describe('CommonPaginateResourcesQueryHandler', () =>
{
    let queryHandler: CommonPaginateResourcesQueryHandler;
    let service: CommonPaginateResourcesService;
    let repository: CommonMockResourceRepository;
    let mapper: CommonResourceMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonPaginateResourcesQueryHandler,
                {
                    provide : CommonIResourceRepository,
                    useClass: CommonMockResourceRepository,
                },
                {
                    provide : CommonPaginateResourcesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<CommonPaginateResourcesQueryHandler>(CommonPaginateResourcesQueryHandler);
        service = module.get<CommonPaginateResourcesService>(CommonPaginateResourcesService);
        repository = <CommonMockResourceRepository>module.get<CommonIResourceRepository>(CommonIResourceRepository);
        mapper = new CommonResourceMapper();
    });

    describe('main', () =>
    {
        test('CommonPaginateResourcesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an resources paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new CommonPaginateResourcesQuery(
                    {
                        offset: 0,
                        limit : 10,
                    },
                ),
            )).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource.slice(0,10).map(item => item.toDTO()),
                ),
            );
        });
    });
});

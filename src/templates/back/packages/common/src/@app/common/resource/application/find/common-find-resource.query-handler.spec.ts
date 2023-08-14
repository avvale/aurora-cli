import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonFindResourceQueryHandler } from './common-find-resource.query-handler';
import { CommonMockResourceRepository } from '@app/common/resource/infrastructure/mock/common-mock-resource.repository';
import { CommonIResourceRepository } from '@app/common/resource/domain/common-resource.repository';
import { CommonResourceMapper } from '@app/common/resource/domain/common-resource.mapper';
import { CommonFindResourceQuery } from './common-find-resource.query';
import { CommonFindResourceService } from './common-find-resource.service';

describe('CommonFindResourceQueryHandler', () =>
{
    let queryHandler: CommonFindResourceQueryHandler;
    let service: CommonFindResourceService;
    let repository: CommonMockResourceRepository;
    let mapper: CommonResourceMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonFindResourceQueryHandler,
                {
                    provide : CommonIResourceRepository,
                    useClass: CommonMockResourceRepository,
                },
                {
                    provide : CommonFindResourceService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<CommonFindResourceQueryHandler>(CommonFindResourceQueryHandler);
        service = module.get<CommonFindResourceService>(CommonFindResourceService);
        repository = <CommonMockResourceRepository>module.get<CommonIResourceRepository>(CommonIResourceRepository);
        mapper = new CommonResourceMapper();
    });

    describe('main', () =>
    {
        test('CommonFindResourceQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an resource founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new CommonFindResourceQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});

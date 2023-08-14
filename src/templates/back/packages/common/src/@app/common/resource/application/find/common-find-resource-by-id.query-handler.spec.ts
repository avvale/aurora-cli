import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonFindResourceByIdQueryHandler } from './common-find-resource-by-id.query-handler';
import { CommonMockResourceRepository } from '@app/common/resource/infrastructure/mock/common-mock-resource.repository';
import { commonMockResourceData } from '@app/common/resource/infrastructure/mock/common-mock-resource.data';
import { CommonIResourceRepository } from '@app/common/resource/domain/common-resource.repository';
import { CommonResourceMapper } from '@app/common/resource/domain/common-resource.mapper';
import { CommonFindResourceByIdQuery } from './common-find-resource-by-id.query';
import { CommonFindResourceByIdService } from './common-find-resource-by-id.service';

describe('CommonFindResourceByIdQueryHandler', () =>
{
    let queryHandler: CommonFindResourceByIdQueryHandler;
    let service: CommonFindResourceByIdService;
    let repository: CommonMockResourceRepository;
    let mapper: CommonResourceMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonFindResourceByIdQueryHandler,
                {
                    provide : CommonIResourceRepository,
                    useClass: CommonMockResourceRepository,
                },
                {
                    provide : CommonFindResourceByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<CommonFindResourceByIdQueryHandler>(CommonFindResourceByIdQueryHandler);
        service = module.get<CommonFindResourceByIdService>(CommonFindResourceByIdService);
        repository = <CommonMockResourceRepository>module.get<CommonIResourceRepository>(CommonIResourceRepository);
        mapper = new CommonResourceMapper();
    });

    describe('main', () =>
    {
        test('FindResourceByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an resource founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new CommonFindResourceByIdQuery(
                    commonMockResourceData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});

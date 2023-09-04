import { CommonAdministrativeAreaLevel2Mapper, CommonFindAdministrativeAreaLevel2ByIdQuery, CommonIAdministrativeAreaLevel2Repository, commonMockAdministrativeAreaLevel2Data, CommonMockAdministrativeAreaLevel2Repository } from '@app/common/administrative-area-level-2';
import { CommonFindAdministrativeAreaLevel2ByIdQueryHandler } from '@app/common/administrative-area-level-2/application/find/common-find-administrative-area-level-2-by-id.query-handler';
import { CommonFindAdministrativeAreaLevel2ByIdService } from '@app/common/administrative-area-level-2/application/find/common-find-administrative-area-level-2-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAdministrativeAreaLevel2ByIdQueryHandler', () =>
{
    let queryHandler: CommonFindAdministrativeAreaLevel2ByIdQueryHandler;
    let service: CommonFindAdministrativeAreaLevel2ByIdService;
    let repository: CommonMockAdministrativeAreaLevel2Repository;
    let mapper: CommonAdministrativeAreaLevel2Mapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonFindAdministrativeAreaLevel2ByIdQueryHandler,
                {
                    provide : CommonIAdministrativeAreaLevel2Repository,
                    useClass: CommonMockAdministrativeAreaLevel2Repository,
                },
                {
                    provide : CommonFindAdministrativeAreaLevel2ByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<CommonFindAdministrativeAreaLevel2ByIdQueryHandler>(CommonFindAdministrativeAreaLevel2ByIdQueryHandler);
        service = module.get<CommonFindAdministrativeAreaLevel2ByIdService>(CommonFindAdministrativeAreaLevel2ByIdService);
        repository = <CommonMockAdministrativeAreaLevel2Repository>module.get<CommonIAdministrativeAreaLevel2Repository>(CommonIAdministrativeAreaLevel2Repository);
        mapper = new CommonAdministrativeAreaLevel2Mapper();
    });

    describe('main', () =>
    {
        test('FindAdministrativeAreaLevel2ByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an administrativeAreaLevel2 founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new CommonFindAdministrativeAreaLevel2ByIdQuery(
                    commonMockAdministrativeAreaLevel2Data[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});

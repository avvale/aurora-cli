import { CommonAdministrativeAreaLevel3Mapper, CommonFindAdministrativeAreaLevel3ByIdQuery, CommonIAdministrativeAreaLevel3Repository, commonMockAdministrativeAreaLevel3Data, CommonMockAdministrativeAreaLevel3Repository } from '@app/common/administrative-area-level-3';
import { CommonFindAdministrativeAreaLevel3ByIdQueryHandler } from '@app/common/administrative-area-level-3/application/find/common-find-administrative-area-level-3-by-id.query-handler';
import { CommonFindAdministrativeAreaLevel3ByIdService } from '@app/common/administrative-area-level-3/application/find/common-find-administrative-area-level-3-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAdministrativeAreaLevel3ByIdQueryHandler', () =>
{
    let queryHandler: CommonFindAdministrativeAreaLevel3ByIdQueryHandler;
    let service: CommonFindAdministrativeAreaLevel3ByIdService;
    let repository: CommonMockAdministrativeAreaLevel3Repository;
    let mapper: CommonAdministrativeAreaLevel3Mapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonFindAdministrativeAreaLevel3ByIdQueryHandler,
                {
                    provide : CommonIAdministrativeAreaLevel3Repository,
                    useClass: CommonMockAdministrativeAreaLevel3Repository,
                },
                {
                    provide : CommonFindAdministrativeAreaLevel3ByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<CommonFindAdministrativeAreaLevel3ByIdQueryHandler>(CommonFindAdministrativeAreaLevel3ByIdQueryHandler);
        service = module.get<CommonFindAdministrativeAreaLevel3ByIdService>(CommonFindAdministrativeAreaLevel3ByIdService);
        repository = <CommonMockAdministrativeAreaLevel3Repository>module.get<CommonIAdministrativeAreaLevel3Repository>(CommonIAdministrativeAreaLevel3Repository);
        mapper = new CommonAdministrativeAreaLevel3Mapper();
    });

    describe('main', () =>
    {
        test('FindAdministrativeAreaLevel3ByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an administrativeAreaLevel3 founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new CommonFindAdministrativeAreaLevel3ByIdQuery(
                    commonMockAdministrativeAreaLevel3Data[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});

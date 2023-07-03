import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonFindAdministrativeAreaLevel1ByIdQueryHandler } from './common-find-administrative-area-level-1-by-id.query-handler';
import { CommonMockAdministrativeAreaLevel1Repository } from '@app/common/administrative-area-level-1/infrastructure/mock/common-mock-administrative-area-level-1.repository';
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1/infrastructure/mock/common-mock-administrative-area-level-1.data';
import { CommonIAdministrativeAreaLevel1Repository } from '@app/common/administrative-area-level-1/domain/common-administrative-area-level-1.repository';
import { CommonAdministrativeAreaLevel1Mapper } from '@app/common/administrative-area-level-1/domain/common-administrative-area-level-1.mapper';
import { CommonFindAdministrativeAreaLevel1ByIdQuery } from './common-find-administrative-area-level-1-by-id.query';
import { CommonFindAdministrativeAreaLevel1ByIdService } from './common-find-administrative-area-level-1-by-id.service';

describe('CommonFindAdministrativeAreaLevel1ByIdQueryHandler', () =>
{
    let queryHandler: CommonFindAdministrativeAreaLevel1ByIdQueryHandler;
    let service: CommonFindAdministrativeAreaLevel1ByIdService;
    let repository: CommonMockAdministrativeAreaLevel1Repository;
    let mapper: CommonAdministrativeAreaLevel1Mapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonFindAdministrativeAreaLevel1ByIdQueryHandler,
                {
                    provide : CommonIAdministrativeAreaLevel1Repository,
                    useClass: CommonMockAdministrativeAreaLevel1Repository,
                },
                {
                    provide : CommonFindAdministrativeAreaLevel1ByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<CommonFindAdministrativeAreaLevel1ByIdQueryHandler>(CommonFindAdministrativeAreaLevel1ByIdQueryHandler);
        service = module.get<CommonFindAdministrativeAreaLevel1ByIdService>(CommonFindAdministrativeAreaLevel1ByIdService);
        repository = <CommonMockAdministrativeAreaLevel1Repository>module.get<CommonIAdministrativeAreaLevel1Repository>(CommonIAdministrativeAreaLevel1Repository);
        mapper = new CommonAdministrativeAreaLevel1Mapper();
    });

    describe('main', () =>
    {
        test('FindAdministrativeAreaLevel1ByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an administrativeAreaLevel1 founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new CommonFindAdministrativeAreaLevel1ByIdQuery(
                    commonMockAdministrativeAreaLevel1Data[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
import { CommonAdministrativeAreaLevel2Mapper, CommonIAdministrativeAreaLevel2Repository, CommonMockAdministrativeAreaLevel2Repository, CommonRawSQLAdministrativeAreasLevel2Query } from '@app/common/administrative-area-level-2';
import { CommonRawSQLAdministrativeAreasLevel2QueryHandler } from '@app/common/administrative-area-level-2/application/raw-sql/common-raw-sql-administrative-areas-level-2.query-handler';
import { CommonRawSQLAdministrativeAreasLevel2Service } from '@app/common/administrative-area-level-2/application/raw-sql/common-raw-sql-administrative-areas-level-2.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RawSQLAdministrativeAreasLevel2QueryHandler', () =>
{
    let queryHandler: CommonRawSQLAdministrativeAreasLevel2QueryHandler;
    let service: CommonRawSQLAdministrativeAreasLevel2Service;
    let repository: CommonMockAdministrativeAreaLevel2Repository;
    let mapper: CommonAdministrativeAreaLevel2Mapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonRawSQLAdministrativeAreasLevel2QueryHandler,
                {
                    provide : CommonIAdministrativeAreaLevel2Repository,
                    useClass: CommonMockAdministrativeAreaLevel2Repository,
                },
                {
                    provide : CommonRawSQLAdministrativeAreasLevel2Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<CommonRawSQLAdministrativeAreasLevel2QueryHandler>(CommonRawSQLAdministrativeAreasLevel2QueryHandler);
        service = module.get<CommonRawSQLAdministrativeAreasLevel2Service>(CommonRawSQLAdministrativeAreasLevel2Service);
        repository = <CommonMockAdministrativeAreaLevel2Repository>module.get<CommonIAdministrativeAreaLevel2Repository>(CommonIAdministrativeAreaLevel2Repository);
        mapper = new CommonAdministrativeAreaLevel2Mapper();
    });

    describe('main', () =>
    {
        test('CommonRawSQLAdministrativeAreasLevel2QueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an administrativeAreasLevel2 founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new CommonRawSQLAdministrativeAreasLevel2Query(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});

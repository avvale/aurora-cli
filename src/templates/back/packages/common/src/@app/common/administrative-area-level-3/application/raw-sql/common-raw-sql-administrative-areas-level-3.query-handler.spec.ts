import { CommonAdministrativeAreaLevel3Mapper, CommonIAdministrativeAreaLevel3Repository, CommonMockAdministrativeAreaLevel3Repository, CommonRawSQLAdministrativeAreasLevel3Query } from '@app/common/administrative-area-level-3';
import { CommonRawSQLAdministrativeAreasLevel3QueryHandler } from '@app/common/administrative-area-level-3/application/raw-sql/common-raw-sql-administrative-areas-level-3.query-handler';
import { CommonRawSQLAdministrativeAreasLevel3Service } from '@app/common/administrative-area-level-3/application/raw-sql/common-raw-sql-administrative-areas-level-3.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RawSQLAdministrativeAreasLevel3QueryHandler', () =>
{
    let queryHandler: CommonRawSQLAdministrativeAreasLevel3QueryHandler;
    let service: CommonRawSQLAdministrativeAreasLevel3Service;
    let repository: CommonMockAdministrativeAreaLevel3Repository;
    let mapper: CommonAdministrativeAreaLevel3Mapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonRawSQLAdministrativeAreasLevel3QueryHandler,
                {
                    provide : CommonIAdministrativeAreaLevel3Repository,
                    useClass: CommonMockAdministrativeAreaLevel3Repository,
                },
                {
                    provide : CommonRawSQLAdministrativeAreasLevel3Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<CommonRawSQLAdministrativeAreasLevel3QueryHandler>(CommonRawSQLAdministrativeAreasLevel3QueryHandler);
        service = module.get<CommonRawSQLAdministrativeAreasLevel3Service>(CommonRawSQLAdministrativeAreasLevel3Service);
        repository = <CommonMockAdministrativeAreaLevel3Repository>module.get<CommonIAdministrativeAreaLevel3Repository>(CommonIAdministrativeAreaLevel3Repository);
        mapper = new CommonAdministrativeAreaLevel3Mapper();
    });

    describe('main', () =>
    {
        test('CommonRawSQLAdministrativeAreasLevel3QueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an administrativeAreasLevel3 founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new CommonRawSQLAdministrativeAreasLevel3Query(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});

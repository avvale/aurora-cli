import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonMockAdministrativeAreaLevel2Repository } from '@app/common/administrative-area-level-2/infrastructure/mock/common-mock-administrative-area-level-2.repository';
import { CommonIAdministrativeAreaLevel2Repository } from '@app/common/administrative-area-level-2/domain/common-administrative-area-level-2.repository';
import { CommonAdministrativeAreaLevel2Mapper } from '@app/common/administrative-area-level-2/domain/common-administrative-area-level-2.mapper';
import { CommonRawSQLAdministrativeAreasLevel2QueryHandler } from './common-raw-sql-administrative-areas-level-2.query-handler';
import { CommonRawSQLAdministrativeAreasLevel2Query } from './common-raw-sql-administrative-areas-level-2.query';
import { CommonRawSQLAdministrativeAreasLevel2Service } from './common-raw-sql-administrative-areas-level-2.service';

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
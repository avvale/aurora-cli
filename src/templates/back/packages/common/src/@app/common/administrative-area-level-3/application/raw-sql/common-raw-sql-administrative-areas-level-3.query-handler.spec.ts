import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonMockAdministrativeAreaLevel3Repository } from '@app/common/administrative-area-level-3/infrastructure/mock/common-mock-administrative-area-level-3.repository';
import { CommonIAdministrativeAreaLevel3Repository } from '@app/common/administrative-area-level-3/domain/common-administrative-area-level-3.repository';
import { CommonAdministrativeAreaLevel3Mapper } from '@app/common/administrative-area-level-3/domain/common-administrative-area-level-3.mapper';
import { CommonRawSQLAdministrativeAreasLevel3QueryHandler } from './common-raw-sql-administrative-areas-level-3.query-handler';
import { CommonRawSQLAdministrativeAreasLevel3Query } from './common-raw-sql-administrative-areas-level-3.query';
import { CommonRawSQLAdministrativeAreasLevel3Service } from './common-raw-sql-administrative-areas-level-3.service';

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
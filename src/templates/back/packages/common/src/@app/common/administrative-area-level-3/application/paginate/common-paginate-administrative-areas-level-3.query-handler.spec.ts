import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { CommonPaginateAdministrativeAreasLevel3QueryHandler } from './common-paginate-administrative-areas-level-3.query-handler';
import { CommonMockAdministrativeAreaLevel3Repository } from '@app/common/administrative-area-level-3/infrastructure/mock/common-mock-administrative-area-level-3.repository';
import { CommonIAdministrativeAreaLevel3Repository } from '@app/common/administrative-area-level-3/domain/common-administrative-area-level-3.repository';
import { CommonAdministrativeAreaLevel3Mapper } from '@app/common/administrative-area-level-3/domain/common-administrative-area-level-3.mapper';
import { CommonPaginateAdministrativeAreasLevel3Query } from './common-paginate-administrative-areas-level-3.query';
import { CommonPaginateAdministrativeAreasLevel3Service } from './common-paginate-administrative-areas-level-3.service';

describe('CommonPaginateAdministrativeAreasLevel3QueryHandler', () =>
{
    let queryHandler: CommonPaginateAdministrativeAreasLevel3QueryHandler;
    let service: CommonPaginateAdministrativeAreasLevel3Service;
    let repository: CommonMockAdministrativeAreaLevel3Repository;
    let mapper: CommonAdministrativeAreaLevel3Mapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonPaginateAdministrativeAreasLevel3QueryHandler,
                {
                    provide : CommonIAdministrativeAreaLevel3Repository,
                    useClass: CommonMockAdministrativeAreaLevel3Repository,
                },
                {
                    provide : CommonPaginateAdministrativeAreasLevel3Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<CommonPaginateAdministrativeAreasLevel3QueryHandler>(CommonPaginateAdministrativeAreasLevel3QueryHandler);
        service = module.get<CommonPaginateAdministrativeAreasLevel3Service>(CommonPaginateAdministrativeAreasLevel3Service);
        repository = <CommonMockAdministrativeAreaLevel3Repository>module.get<CommonIAdministrativeAreaLevel3Repository>(CommonIAdministrativeAreaLevel3Repository);
        mapper = new CommonAdministrativeAreaLevel3Mapper();
    });

    describe('main', () =>
    {
        test('CommonPaginateAdministrativeAreasLevel3QueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an administrativeAreasLevel3 paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new CommonPaginateAdministrativeAreasLevel3Query(
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

import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { CommonPaginateAdministrativeAreasLevel2QueryHandler } from './common-paginate-administrative-areas-level-2.query-handler';
import { CommonMockAdministrativeAreaLevel2Repository } from '@app/common/administrative-area-level-2/infrastructure/mock/common-mock-administrative-area-level-2.repository';
import { CommonIAdministrativeAreaLevel2Repository } from '@app/common/administrative-area-level-2/domain/common-administrative-area-level-2.repository';
import { CommonAdministrativeAreaLevel2Mapper } from '@app/common/administrative-area-level-2/domain/common-administrative-area-level-2.mapper';
import { CommonPaginateAdministrativeAreasLevel2Query } from './common-paginate-administrative-areas-level-2.query';
import { CommonPaginateAdministrativeAreasLevel2Service } from './common-paginate-administrative-areas-level-2.service';

describe('CommonPaginateAdministrativeAreasLevel2QueryHandler', () =>
{
    let queryHandler: CommonPaginateAdministrativeAreasLevel2QueryHandler;
    let service: CommonPaginateAdministrativeAreasLevel2Service;
    let repository: CommonMockAdministrativeAreaLevel2Repository;
    let mapper: CommonAdministrativeAreaLevel2Mapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonPaginateAdministrativeAreasLevel2QueryHandler,
                {
                    provide : CommonIAdministrativeAreaLevel2Repository,
                    useClass: CommonMockAdministrativeAreaLevel2Repository,
                },
                {
                    provide : CommonPaginateAdministrativeAreasLevel2Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<CommonPaginateAdministrativeAreasLevel2QueryHandler>(CommonPaginateAdministrativeAreasLevel2QueryHandler);
        service = module.get<CommonPaginateAdministrativeAreasLevel2Service>(CommonPaginateAdministrativeAreasLevel2Service);
        repository = <CommonMockAdministrativeAreaLevel2Repository>module.get<CommonIAdministrativeAreaLevel2Repository>(CommonIAdministrativeAreaLevel2Repository);
        mapper = new CommonAdministrativeAreaLevel2Mapper();
    });

    describe('main', () =>
    {
        test('CommonPaginateAdministrativeAreasLevel2QueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an administrativeAreasLevel2 paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new CommonPaginateAdministrativeAreasLevel2Query(
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

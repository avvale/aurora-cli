import { CommonIAdministrativeAreaLevel1Repository, CommonMockAdministrativeAreaLevel1Repository, CommonPaginateAdministrativeAreasLevel1Query } from '@app/common/administrative-area-level-1';
import { CommonPaginateAdministrativeAreasLevel1QueryHandler } from '@app/common/administrative-area-level-1/application/paginate/common-paginate-administrative-areas-level-1.query-handler';
import { CommonPaginateAdministrativeAreasLevel1Service } from '@app/common/administrative-area-level-1/application/paginate/common-paginate-administrative-areas-level-1.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateAdministrativeAreasLevel1QueryHandler', () =>
{
    let queryHandler: CommonPaginateAdministrativeAreasLevel1QueryHandler;
    let service: CommonPaginateAdministrativeAreasLevel1Service;
    let repository: CommonMockAdministrativeAreaLevel1Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonPaginateAdministrativeAreasLevel1QueryHandler,
                {
                    provide : CommonIAdministrativeAreaLevel1Repository,
                    useClass: CommonMockAdministrativeAreaLevel1Repository,
                },
                {
                    provide : CommonPaginateAdministrativeAreasLevel1Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<CommonPaginateAdministrativeAreasLevel1QueryHandler>(CommonPaginateAdministrativeAreasLevel1QueryHandler);
        service = module.get<CommonPaginateAdministrativeAreasLevel1Service>(CommonPaginateAdministrativeAreasLevel1Service);
        repository = <CommonMockAdministrativeAreaLevel1Repository>module.get<CommonIAdministrativeAreaLevel1Repository>(CommonIAdministrativeAreaLevel1Repository);
    });

    describe('main', () =>
    {
        test('CommonPaginateAdministrativeAreasLevel1QueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an administrativeAreasLevel1 paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new CommonPaginateAdministrativeAreasLevel1Query(
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

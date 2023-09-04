import { CommonIAdministrativeAreaLevel3Repository, CommonMockAdministrativeAreaLevel3Repository, CommonPaginateAdministrativeAreasLevel3Query } from '@app/common/administrative-area-level-3';
import { CommonPaginateAdministrativeAreasLevel3QueryHandler } from '@app/common/administrative-area-level-3/application/paginate/common-paginate-administrative-areas-level-3.query-handler';
import { CommonPaginateAdministrativeAreasLevel3Service } from '@app/common/administrative-area-level-3/application/paginate/common-paginate-administrative-areas-level-3.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateAdministrativeAreasLevel3QueryHandler', () =>
{
    let queryHandler: CommonPaginateAdministrativeAreasLevel3QueryHandler;
    let service: CommonPaginateAdministrativeAreasLevel3Service;
    let repository: CommonMockAdministrativeAreaLevel3Repository;

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

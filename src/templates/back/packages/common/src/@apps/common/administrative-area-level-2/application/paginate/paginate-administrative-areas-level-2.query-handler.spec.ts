import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { PaginateAdministrativeAreasLevel2QueryHandler } from './paginate-administrative-areas-level-2.query-handler';
import { MockAdministrativeAreaLevel2Repository } from '@app/common/administrative-area-level-2/infrastructure/mock/mock-administrative-area-level-2.repository';
import { IAdministrativeAreaLevel2Repository } from '@app/common/administrative-area-level-2/domain/administrative-area-level-2.repository';
import { AdministrativeAreaLevel2Mapper } from '@app/common/administrative-area-level-2/domain/administrative-area-level-2.mapper';
import { PaginateAdministrativeAreasLevel2Query } from './paginate-administrative-areas-level-2.query';
import { PaginateAdministrativeAreasLevel2Service } from './paginate-administrative-areas-level-2.service';

describe('PaginateAdministrativeAreasLevel2QueryHandler', () =>
{
    let queryHandler: PaginateAdministrativeAreasLevel2QueryHandler;
    let service: PaginateAdministrativeAreasLevel2Service;
    let repository: MockAdministrativeAreaLevel2Repository;
    let mapper: AdministrativeAreaLevel2Mapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateAdministrativeAreasLevel2QueryHandler,
                {
                    provide : IAdministrativeAreaLevel2Repository,
                    useClass: MockAdministrativeAreaLevel2Repository,
                },
                {
                    provide : PaginateAdministrativeAreasLevel2Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<PaginateAdministrativeAreasLevel2QueryHandler>(PaginateAdministrativeAreasLevel2QueryHandler);
        service         = module.get<PaginateAdministrativeAreasLevel2Service>(PaginateAdministrativeAreasLevel2Service);
        repository      = <MockAdministrativeAreaLevel2Repository>module.get<IAdministrativeAreaLevel2Repository>(IAdministrativeAreaLevel2Repository);
        mapper          = new AdministrativeAreaLevel2Mapper();
    });

    describe('main', () =>
    {
        test('PaginateAdministrativeAreasLevel2QueryHandler should be defined', () =>
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
                new PaginateAdministrativeAreasLevel2Query(
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
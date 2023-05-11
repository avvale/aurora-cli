import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { PaginateAdministrativeAreasLevel1QueryHandler } from './paginate-administrative-areas-level-1.query-handler';
import { MockAdministrativeAreaLevel1Repository } from '@app/common/administrative-area-level-1/infrastructure/mock/mock-administrative-area-level-1.repository';
import { IAdministrativeAreaLevel1Repository } from '@app/common/administrative-area-level-1/domain/administrative-area-level-1.repository';
import { AdministrativeAreaLevel1Mapper } from '@app/common/administrative-area-level-1/domain/administrative-area-level-1.mapper';
import { PaginateAdministrativeAreasLevel1Query } from './paginate-administrative-areas-level-1.query';
import { PaginateAdministrativeAreasLevel1Service } from './paginate-administrative-areas-level-1.service';

describe('PaginateAdministrativeAreasLevel1QueryHandler', () =>
{
    let queryHandler: PaginateAdministrativeAreasLevel1QueryHandler;
    let service: PaginateAdministrativeAreasLevel1Service;
    let repository: MockAdministrativeAreaLevel1Repository;
    let mapper: AdministrativeAreaLevel1Mapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateAdministrativeAreasLevel1QueryHandler,
                {
                    provide : IAdministrativeAreaLevel1Repository,
                    useClass: MockAdministrativeAreaLevel1Repository,
                },
                {
                    provide : PaginateAdministrativeAreasLevel1Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<PaginateAdministrativeAreasLevel1QueryHandler>(PaginateAdministrativeAreasLevel1QueryHandler);
        service         = module.get<PaginateAdministrativeAreasLevel1Service>(PaginateAdministrativeAreasLevel1Service);
        repository      = <MockAdministrativeAreaLevel1Repository>module.get<IAdministrativeAreaLevel1Repository>(IAdministrativeAreaLevel1Repository);
        mapper          = new AdministrativeAreaLevel1Mapper();
    });

    describe('main', () =>
    {
        test('PaginateAdministrativeAreasLevel1QueryHandler should be defined', () =>
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
                new PaginateAdministrativeAreasLevel1Query(
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
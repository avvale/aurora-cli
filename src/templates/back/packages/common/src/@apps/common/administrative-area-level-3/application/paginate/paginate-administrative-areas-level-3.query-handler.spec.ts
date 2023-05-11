import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { PaginateAdministrativeAreasLevel3QueryHandler } from './paginate-administrative-areas-level-3.query-handler';
import { MockAdministrativeAreaLevel3Repository } from '@app/common/administrative-area-level-3/infrastructure/mock/mock-administrative-area-level-3.repository';
import { IAdministrativeAreaLevel3Repository } from '@app/common/administrative-area-level-3/domain/administrative-area-level-3.repository';
import { AdministrativeAreaLevel3Mapper } from '@app/common/administrative-area-level-3/domain/administrative-area-level-3.mapper';
import { PaginateAdministrativeAreasLevel3Query } from './paginate-administrative-areas-level-3.query';
import { PaginateAdministrativeAreasLevel3Service } from './paginate-administrative-areas-level-3.service';

describe('PaginateAdministrativeAreasLevel3QueryHandler', () =>
{
    let queryHandler: PaginateAdministrativeAreasLevel3QueryHandler;
    let service: PaginateAdministrativeAreasLevel3Service;
    let repository: MockAdministrativeAreaLevel3Repository;
    let mapper: AdministrativeAreaLevel3Mapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateAdministrativeAreasLevel3QueryHandler,
                {
                    provide : IAdministrativeAreaLevel3Repository,
                    useClass: MockAdministrativeAreaLevel3Repository,
                },
                {
                    provide : PaginateAdministrativeAreasLevel3Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<PaginateAdministrativeAreasLevel3QueryHandler>(PaginateAdministrativeAreasLevel3QueryHandler);
        service         = module.get<PaginateAdministrativeAreasLevel3Service>(PaginateAdministrativeAreasLevel3Service);
        repository      = <MockAdministrativeAreaLevel3Repository>module.get<IAdministrativeAreaLevel3Repository>(IAdministrativeAreaLevel3Repository);
        mapper          = new AdministrativeAreaLevel3Mapper();
    });

    describe('main', () =>
    {
        test('PaginateAdministrativeAreasLevel3QueryHandler should be defined', () =>
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
                new PaginateAdministrativeAreasLevel3Query(
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
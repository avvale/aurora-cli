import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindAdministrativeAreaLevel3ByIdQueryHandler } from './find-administrative-area-level-3-by-id.query-handler';
import { MockAdministrativeAreaLevel3Repository } from '@app/common/administrative-area-level-3/infrastructure/mock/mock-administrative-area-level-3.repository';
import { administrativeAreasLevel3 } from '@app/common/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';
import { IAdministrativeAreaLevel3Repository } from '@app/common/administrative-area-level-3/domain/administrative-area-level-3.repository';
import { AdministrativeAreaLevel3Mapper } from '@app/common/administrative-area-level-3/domain/administrative-area-level-3.mapper';
import { FindAdministrativeAreaLevel3ByIdQuery } from './find-administrative-area-level-3-by-id.query';
import { FindAdministrativeAreaLevel3ByIdService } from './find-administrative-area-level-3-by-id.service';

describe('FindAdministrativeAreaLevel3ByIdQueryHandler', () =>
{
    let queryHandler: FindAdministrativeAreaLevel3ByIdQueryHandler;
    let service: FindAdministrativeAreaLevel3ByIdService;
    let repository: MockAdministrativeAreaLevel3Repository;
    let mapper: AdministrativeAreaLevel3Mapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindAdministrativeAreaLevel3ByIdQueryHandler,
                {
                    provide : IAdministrativeAreaLevel3Repository,
                    useClass: MockAdministrativeAreaLevel3Repository,
                },
                {
                    provide : FindAdministrativeAreaLevel3ByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<FindAdministrativeAreaLevel3ByIdQueryHandler>(FindAdministrativeAreaLevel3ByIdQueryHandler);
        service         = module.get<FindAdministrativeAreaLevel3ByIdService>(FindAdministrativeAreaLevel3ByIdService);
        repository      = <MockAdministrativeAreaLevel3Repository>module.get<IAdministrativeAreaLevel3Repository>(IAdministrativeAreaLevel3Repository);
        mapper          = new AdministrativeAreaLevel3Mapper();
    });

    describe('main', () =>
    {
        test('FindAdministrativeAreaLevel3ByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an administrativeAreaLevel3 founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindAdministrativeAreaLevel3ByIdQuery(
                    administrativeAreasLevel3[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindAdministrativeAreaLevel1ByIdQueryHandler } from './find-administrative-area-level-1-by-id.query-handler';
import { MockAdministrativeAreaLevel1Repository } from '@app/common/administrative-area-level-1/infrastructure/mock/mock-administrative-area-level-1.repository';
import { administrativeAreasLevel1 } from '@app/common/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';
import { IAdministrativeAreaLevel1Repository } from '@app/common/administrative-area-level-1/domain/administrative-area-level-1.repository';
import { AdministrativeAreaLevel1Mapper } from '@app/common/administrative-area-level-1/domain/administrative-area-level-1.mapper';
import { FindAdministrativeAreaLevel1ByIdQuery } from './find-administrative-area-level-1-by-id.query';
import { FindAdministrativeAreaLevel1ByIdService } from './find-administrative-area-level-1-by-id.service';

describe('FindAdministrativeAreaLevel1ByIdQueryHandler', () =>
{
    let queryHandler: FindAdministrativeAreaLevel1ByIdQueryHandler;
    let service: FindAdministrativeAreaLevel1ByIdService;
    let repository: MockAdministrativeAreaLevel1Repository;
    let mapper: AdministrativeAreaLevel1Mapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindAdministrativeAreaLevel1ByIdQueryHandler,
                {
                    provide : IAdministrativeAreaLevel1Repository,
                    useClass: MockAdministrativeAreaLevel1Repository,
                },
                {
                    provide : FindAdministrativeAreaLevel1ByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<FindAdministrativeAreaLevel1ByIdQueryHandler>(FindAdministrativeAreaLevel1ByIdQueryHandler);
        service         = module.get<FindAdministrativeAreaLevel1ByIdService>(FindAdministrativeAreaLevel1ByIdService);
        repository      = <MockAdministrativeAreaLevel1Repository>module.get<IAdministrativeAreaLevel1Repository>(IAdministrativeAreaLevel1Repository);
        mapper          = new AdministrativeAreaLevel1Mapper();
    });

    describe('main', () =>
    {
        test('FindAdministrativeAreaLevel1ByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an administrativeAreaLevel1 founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindAdministrativeAreaLevel1ByIdQuery(
                    administrativeAreasLevel1[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
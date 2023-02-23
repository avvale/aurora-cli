import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindAdministrativeAreaLevel2ByIdQueryHandler } from './find-administrative-area-level-2-by-id.query-handler';
import { MockAdministrativeAreaLevel2Repository } from '@app/common/administrative-area-level-2/infrastructure/mock/mock-administrative-area-level-2.repository';
import { administrativeAreasLevel2 } from '@app/common/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';
import { IAdministrativeAreaLevel2Repository } from '@app/common/administrative-area-level-2/domain/administrative-area-level-2.repository';
import { AdministrativeAreaLevel2Mapper } from '@app/common/administrative-area-level-2/domain/administrative-area-level-2.mapper';
import { FindAdministrativeAreaLevel2ByIdQuery } from './find-administrative-area-level-2-by-id.query';
import { FindAdministrativeAreaLevel2ByIdService } from './find-administrative-area-level-2-by-id.service';

describe('FindAdministrativeAreaLevel2ByIdQueryHandler', () =>
{
    let queryHandler: FindAdministrativeAreaLevel2ByIdQueryHandler;
    let service: FindAdministrativeAreaLevel2ByIdService;
    let repository: MockAdministrativeAreaLevel2Repository;
    let mapper: AdministrativeAreaLevel2Mapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindAdministrativeAreaLevel2ByIdQueryHandler,
                {
                    provide : IAdministrativeAreaLevel2Repository,
                    useClass: MockAdministrativeAreaLevel2Repository,
                },
                {
                    provide : FindAdministrativeAreaLevel2ByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<FindAdministrativeAreaLevel2ByIdQueryHandler>(FindAdministrativeAreaLevel2ByIdQueryHandler);
        service         = module.get<FindAdministrativeAreaLevel2ByIdService>(FindAdministrativeAreaLevel2ByIdService);
        repository      = <MockAdministrativeAreaLevel2Repository>module.get<IAdministrativeAreaLevel2Repository>(IAdministrativeAreaLevel2Repository);
        mapper          = new AdministrativeAreaLevel2Mapper();
    });

    describe('main', () =>
    {
        test('FindAdministrativeAreaLevel2ByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an administrativeAreaLevel2 founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindAdministrativeAreaLevel2ByIdQuery(
                    administrativeAreasLevel2[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
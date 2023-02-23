import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindAdministrativeAreaLevel3QueryHandler } from './find-administrative-area-level-3.query-handler';
import { MockAdministrativeAreaLevel3Repository } from '@app/common/administrative-area-level-3/infrastructure/mock/mock-administrative-area-level-3.repository';
import { IAdministrativeAreaLevel3Repository } from '@app/common/administrative-area-level-3/domain/administrative-area-level-3.repository';
import { AdministrativeAreaLevel3Mapper } from '@app/common/administrative-area-level-3/domain/administrative-area-level-3.mapper';
import { FindAdministrativeAreaLevel3Query } from './find-administrative-area-level-3.query';
import { FindAdministrativeAreaLevel3Service } from './find-administrative-area-level-3.service';

describe('FindAdministrativeAreaLevel3QueryHandler', () =>
{
    let queryHandler: FindAdministrativeAreaLevel3QueryHandler;
    let service: FindAdministrativeAreaLevel3Service;
    let repository: MockAdministrativeAreaLevel3Repository;
    let mapper: AdministrativeAreaLevel3Mapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindAdministrativeAreaLevel3QueryHandler,
                {
                    provide : IAdministrativeAreaLevel3Repository,
                    useClass: MockAdministrativeAreaLevel3Repository,
                },
                {
                    provide : FindAdministrativeAreaLevel3Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<FindAdministrativeAreaLevel3QueryHandler>(FindAdministrativeAreaLevel3QueryHandler);
        service         = module.get<FindAdministrativeAreaLevel3Service>(FindAdministrativeAreaLevel3Service);
        repository      = <MockAdministrativeAreaLevel3Repository>module.get<IAdministrativeAreaLevel3Repository>(IAdministrativeAreaLevel3Repository);
        mapper          = new AdministrativeAreaLevel3Mapper();
    });

    describe('main', () =>
    {
        test('FindAdministrativeAreaLevel3QueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an administrativeAreaLevel3 founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindAdministrativeAreaLevel3Query(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
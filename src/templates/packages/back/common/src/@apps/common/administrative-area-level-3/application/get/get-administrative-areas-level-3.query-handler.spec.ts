import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetAdministrativeAreasLevel3QueryHandler } from './get-administrative-areas-level-3.query-handler';
import { MockAdministrativeAreaLevel3Repository } from '@app/common/administrative-area-level-3/infrastructure/mock/mock-administrative-area-level-3.repository';
import { IAdministrativeAreaLevel3Repository } from '@app/common/administrative-area-level-3/domain/administrative-area-level-3.repository';
import { AdministrativeAreaLevel3Mapper } from '@app/common/administrative-area-level-3/domain/administrative-area-level-3.mapper';
import { GetAdministrativeAreasLevel3Query } from './get-administrative-areas-level-3.query';
import { GetAdministrativeAreasLevel3Service } from './get-administrative-areas-level-3.service';

describe('GetAdministrativeAreasLevel3QueryHandler', () =>
{
    let queryHandler: GetAdministrativeAreasLevel3QueryHandler;
    let service: GetAdministrativeAreasLevel3Service;
    let repository: MockAdministrativeAreaLevel3Repository;
    let mapper: AdministrativeAreaLevel3Mapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetAdministrativeAreasLevel3QueryHandler,
                {
                    provide : IAdministrativeAreaLevel3Repository,
                    useClass: MockAdministrativeAreaLevel3Repository,
                },
                {
                    provide : GetAdministrativeAreasLevel3Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<GetAdministrativeAreasLevel3QueryHandler>(GetAdministrativeAreasLevel3QueryHandler);
        service         = module.get<GetAdministrativeAreasLevel3Service>(GetAdministrativeAreasLevel3Service);
        repository      = <MockAdministrativeAreaLevel3Repository>module.get<IAdministrativeAreaLevel3Repository>(IAdministrativeAreaLevel3Repository);
        mapper          = new AdministrativeAreaLevel3Mapper();
    });

    describe('main', () =>
    {
        test('GetAdministrativeAreasLevel3QueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an administrativeAreasLevel3 founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetAdministrativeAreasLevel3Query(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
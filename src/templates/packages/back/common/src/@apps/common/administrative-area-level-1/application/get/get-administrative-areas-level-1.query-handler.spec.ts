import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetAdministrativeAreasLevel1QueryHandler } from './get-administrative-areas-level-1.query-handler';
import { MockAdministrativeAreaLevel1Repository } from '@app/common/administrative-area-level-1/infrastructure/mock/mock-administrative-area-level-1.repository';
import { IAdministrativeAreaLevel1Repository } from '@app/common/administrative-area-level-1/domain/administrative-area-level-1.repository';
import { AdministrativeAreaLevel1Mapper } from '@app/common/administrative-area-level-1/domain/administrative-area-level-1.mapper';
import { GetAdministrativeAreasLevel1Query } from './get-administrative-areas-level-1.query';
import { GetAdministrativeAreasLevel1Service } from './get-administrative-areas-level-1.service';

describe('GetAdministrativeAreasLevel1QueryHandler', () =>
{
    let queryHandler: GetAdministrativeAreasLevel1QueryHandler;
    let service: GetAdministrativeAreasLevel1Service;
    let repository: MockAdministrativeAreaLevel1Repository;
    let mapper: AdministrativeAreaLevel1Mapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetAdministrativeAreasLevel1QueryHandler,
                {
                    provide : IAdministrativeAreaLevel1Repository,
                    useClass: MockAdministrativeAreaLevel1Repository,
                },
                {
                    provide : GetAdministrativeAreasLevel1Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<GetAdministrativeAreasLevel1QueryHandler>(GetAdministrativeAreasLevel1QueryHandler);
        service         = module.get<GetAdministrativeAreasLevel1Service>(GetAdministrativeAreasLevel1Service);
        repository      = <MockAdministrativeAreaLevel1Repository>module.get<IAdministrativeAreaLevel1Repository>(IAdministrativeAreaLevel1Repository);
        mapper          = new AdministrativeAreaLevel1Mapper();
    });

    describe('main', () =>
    {
        test('GetAdministrativeAreasLevel1QueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an administrativeAreasLevel1 founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetAdministrativeAreasLevel1Query(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
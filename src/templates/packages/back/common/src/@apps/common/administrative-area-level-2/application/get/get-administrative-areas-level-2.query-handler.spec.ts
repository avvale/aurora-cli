import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetAdministrativeAreasLevel2QueryHandler } from './get-administrative-areas-level-2.query-handler';
import { MockAdministrativeAreaLevel2Repository } from '@app/common/administrative-area-level-2/infrastructure/mock/mock-administrative-area-level-2.repository';
import { IAdministrativeAreaLevel2Repository } from '@app/common/administrative-area-level-2/domain/administrative-area-level-2.repository';
import { AdministrativeAreaLevel2Mapper } from '@app/common/administrative-area-level-2/domain/administrative-area-level-2.mapper';
import { GetAdministrativeAreasLevel2Query } from './get-administrative-areas-level-2.query';
import { GetAdministrativeAreasLevel2Service } from './get-administrative-areas-level-2.service';

describe('GetAdministrativeAreasLevel2QueryHandler', () =>
{
    let queryHandler: GetAdministrativeAreasLevel2QueryHandler;
    let service: GetAdministrativeAreasLevel2Service;
    let repository: MockAdministrativeAreaLevel2Repository;
    let mapper: AdministrativeAreaLevel2Mapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetAdministrativeAreasLevel2QueryHandler,
                {
                    provide : IAdministrativeAreaLevel2Repository,
                    useClass: MockAdministrativeAreaLevel2Repository,
                },
                {
                    provide : GetAdministrativeAreasLevel2Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<GetAdministrativeAreasLevel2QueryHandler>(GetAdministrativeAreasLevel2QueryHandler);
        service         = module.get<GetAdministrativeAreasLevel2Service>(GetAdministrativeAreasLevel2Service);
        repository      = <MockAdministrativeAreaLevel2Repository>module.get<IAdministrativeAreaLevel2Repository>(IAdministrativeAreaLevel2Repository);
        mapper          = new AdministrativeAreaLevel2Mapper();
    });

    describe('main', () =>
    {
        test('GetAdministrativeAreasLevel2QueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an administrativeAreasLevel2 founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetAdministrativeAreasLevel2Query(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
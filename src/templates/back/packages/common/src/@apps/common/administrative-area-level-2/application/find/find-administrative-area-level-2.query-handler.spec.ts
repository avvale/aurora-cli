import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindAdministrativeAreaLevel2QueryHandler } from './find-administrative-area-level-2.query-handler';
import { MockAdministrativeAreaLevel2Repository } from '@app/common/administrative-area-level-2/infrastructure/mock/mock-administrative-area-level-2.repository';
import { IAdministrativeAreaLevel2Repository } from '@app/common/administrative-area-level-2/domain/administrative-area-level-2.repository';
import { AdministrativeAreaLevel2Mapper } from '@app/common/administrative-area-level-2/domain/administrative-area-level-2.mapper';
import { FindAdministrativeAreaLevel2Query } from './find-administrative-area-level-2.query';
import { FindAdministrativeAreaLevel2Service } from './find-administrative-area-level-2.service';

describe('FindAdministrativeAreaLevel2QueryHandler', () =>
{
    let queryHandler: FindAdministrativeAreaLevel2QueryHandler;
    let service: FindAdministrativeAreaLevel2Service;
    let repository: MockAdministrativeAreaLevel2Repository;
    let mapper: AdministrativeAreaLevel2Mapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindAdministrativeAreaLevel2QueryHandler,
                {
                    provide : IAdministrativeAreaLevel2Repository,
                    useClass: MockAdministrativeAreaLevel2Repository,
                },
                {
                    provide : FindAdministrativeAreaLevel2Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<FindAdministrativeAreaLevel2QueryHandler>(FindAdministrativeAreaLevel2QueryHandler);
        service         = module.get<FindAdministrativeAreaLevel2Service>(FindAdministrativeAreaLevel2Service);
        repository      = <MockAdministrativeAreaLevel2Repository>module.get<IAdministrativeAreaLevel2Repository>(IAdministrativeAreaLevel2Repository);
        mapper          = new AdministrativeAreaLevel2Mapper();
    });

    describe('main', () =>
    {
        test('FindAdministrativeAreaLevel2QueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an administrativeAreaLevel2 founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindAdministrativeAreaLevel2Query(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
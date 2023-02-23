import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindAdministrativeAreaLevel1QueryHandler } from './find-administrative-area-level-1.query-handler';
import { MockAdministrativeAreaLevel1Repository } from '@app/common/administrative-area-level-1/infrastructure/mock/mock-administrative-area-level-1.repository';
import { IAdministrativeAreaLevel1Repository } from '@app/common/administrative-area-level-1/domain/administrative-area-level-1.repository';
import { AdministrativeAreaLevel1Mapper } from '@app/common/administrative-area-level-1/domain/administrative-area-level-1.mapper';
import { FindAdministrativeAreaLevel1Query } from './find-administrative-area-level-1.query';
import { FindAdministrativeAreaLevel1Service } from './find-administrative-area-level-1.service';

describe('FindAdministrativeAreaLevel1QueryHandler', () =>
{
    let queryHandler: FindAdministrativeAreaLevel1QueryHandler;
    let service: FindAdministrativeAreaLevel1Service;
    let repository: MockAdministrativeAreaLevel1Repository;
    let mapper: AdministrativeAreaLevel1Mapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindAdministrativeAreaLevel1QueryHandler,
                {
                    provide : IAdministrativeAreaLevel1Repository,
                    useClass: MockAdministrativeAreaLevel1Repository,
                },
                {
                    provide : FindAdministrativeAreaLevel1Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<FindAdministrativeAreaLevel1QueryHandler>(FindAdministrativeAreaLevel1QueryHandler);
        service         = module.get<FindAdministrativeAreaLevel1Service>(FindAdministrativeAreaLevel1Service);
        repository      = <MockAdministrativeAreaLevel1Repository>module.get<IAdministrativeAreaLevel1Repository>(IAdministrativeAreaLevel1Repository);
        mapper          = new AdministrativeAreaLevel1Mapper();
    });

    describe('main', () =>
    {
        test('FindAdministrativeAreaLevel1QueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an administrativeAreaLevel1 founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindAdministrativeAreaLevel1Query(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
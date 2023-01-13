import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindClientQueryHandler } from './find-client.query-handler';
import { MockClientRepository } from '@app/o-auth/client/infrastructure/mock/mock-client.repository';
import { IClientRepository } from '@app/o-auth/client/domain/client.repository';
import { ClientMapper } from '@app/o-auth/client/domain/client.mapper';
import { FindClientQuery } from './find-client.query';
import { FindClientService } from './find-client.service';

describe('FindClientQueryHandler', () =>
{
    let queryHandler: FindClientQueryHandler;
    let service: FindClientService;
    let repository: MockClientRepository;
    let mapper: ClientMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindClientQueryHandler,
                {
                    provide : IClientRepository,
                    useClass: MockClientRepository,
                },
                {
                    provide : FindClientService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<FindClientQueryHandler>(FindClientQueryHandler);
        service         = module.get<FindClientService>(FindClientService);
        repository      = <MockClientRepository>module.get<IClientRepository>(IClientRepository);
        mapper          = new ClientMapper();
    });

    describe('main', () =>
    {
        test('FindClientQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an client founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindClientQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
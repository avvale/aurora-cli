import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindClientByIdQueryHandler } from './find-client-by-id.query-handler';
import { MockClientRepository } from '@apps/o-auth/client/infrastructure/mock/mock-client.repository';
import { clients } from '@apps/o-auth/client/infrastructure/seeds/client.seed';
import { IClientRepository } from '@apps/o-auth/client/domain/client.repository';
import { ClientMapper } from '@apps/o-auth/client/domain/client.mapper';
import { FindClientByIdQuery } from './find-client-by-id.query';
import { FindClientByIdService } from './find-client-by-id.service';

describe('FindClientByIdQueryHandler', () =>
{
    let queryHandler: FindClientByIdQueryHandler;
    let service: FindClientByIdService;
    let repository: MockClientRepository;
    let mapper: ClientMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindClientByIdQueryHandler,
                {
                    provide : IClientRepository,
                    useClass: MockClientRepository,
                },
                {
                    provide : FindClientByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<FindClientByIdQueryHandler>(FindClientByIdQueryHandler);
        service         = module.get<FindClientByIdService>(FindClientByIdService);
        repository      = <MockClientRepository>module.get<IClientRepository>(IClientRepository);
        mapper          = new ClientMapper();
    });

    describe('main', () =>
    {
        test('FindClientByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an client founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindClientByIdQuery(
                    clients[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
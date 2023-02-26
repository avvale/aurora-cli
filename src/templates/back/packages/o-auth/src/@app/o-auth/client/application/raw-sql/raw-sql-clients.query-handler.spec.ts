import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { MockClientRepository } from '@app/o-auth/client/infrastructure/mock/mock-client.repository';
import { IClientRepository } from '@app/o-auth/client/domain/client.repository';
import { ClientMapper } from '@app/o-auth/client/domain/client.mapper';
import { RawSQLClientsQueryHandler } from './raw-sql-clients.query-handler';
import { RawSQLClientsQuery } from './raw-sql-clients.query';
import { RawSQLClientsService } from './raw-sql-clients.service';

describe('RawSQLClientsQueryHandler', () =>
{
    let queryHandler: RawSQLClientsQueryHandler;
    let service: RawSQLClientsService;
    let repository: MockClientRepository;
    let mapper: ClientMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RawSQLClientsQueryHandler,
                {
                    provide : IClientRepository,
                    useClass: MockClientRepository,
                },
                {
                    provide : RawSQLClientsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<RawSQLClientsQueryHandler>(RawSQLClientsQueryHandler);
        service         = module.get<RawSQLClientsService>(RawSQLClientsService);
        repository      = <MockClientRepository>module.get<IClientRepository>(IClientRepository);
        mapper          = new ClientMapper();
    });

    describe('main', () =>
    {
        test('RawSQLClientsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an clients founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new RawSQLClientsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
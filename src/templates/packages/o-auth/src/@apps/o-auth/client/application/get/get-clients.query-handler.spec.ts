import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetClientsQueryHandler } from './get-clients.query-handler';
import { MockClientRepository } from '../../../../../@apps/o-auth/client/infrastructure/mock/mock-client.repository';
import { IClientRepository } from '../../../../../@apps/o-auth/client/domain/client.repository';
import { ClientMapper } from '../../../../../@apps/o-auth/client/domain/client.mapper';
import { GetClientsQuery } from './get-clients.query';
import { GetClientsService } from './get-clients.service';

describe('GetClientsQueryHandler', () =>
{
    let queryHandler: GetClientsQueryHandler;
    let service: GetClientsService;
    let repository: MockClientRepository;
    let mapper: ClientMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetClientsQueryHandler,
                {
                    provide : IClientRepository,
                    useClass: MockClientRepository,
                },
                {
                    provide : GetClientsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<GetClientsQueryHandler>(GetClientsQueryHandler);
        service         = module.get<GetClientsService>(GetClientsService);
        repository      = <MockClientRepository>module.get<IClientRepository>(IClientRepository);
        mapper          = new ClientMapper();
    });

    describe('main', () =>
    {
        test('GetClientsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an clients founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetClientsQuery()
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
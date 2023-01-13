import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurora-ts/core';

// custom items
import { PaginateClientsQueryHandler } from './paginate-clients.query-handler';
import { MockClientRepository } from '@app/o-auth/client/infrastructure/mock/mock-client.repository';
import { IClientRepository } from '@app/o-auth/client/domain/client.repository';
import { ClientMapper } from '@app/o-auth/client/domain/client.mapper';
import { PaginateClientsQuery } from './paginate-clients.query';
import { PaginateClientsService } from './paginate-clients.service';

describe('PaginateClientsQueryHandler', () =>
{
    let queryHandler: PaginateClientsQueryHandler;
    let service: PaginateClientsService;
    let repository: MockClientRepository;
    let mapper: ClientMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateClientsQueryHandler,
                {
                    provide : IClientRepository,
                    useClass: MockClientRepository,
                },
                {
                    provide : PaginateClientsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<PaginateClientsQueryHandler>(PaginateClientsQueryHandler);
        service         = module.get<PaginateClientsService>(PaginateClientsService);
        repository      = <MockClientRepository>module.get<IClientRepository>(IClientRepository);
        mapper          = new ClientMapper();
    });

    describe('main', () =>
    {
        test('PaginateClientsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an clients paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new PaginateClientsQuery(
                    {
                        offset: 0,
                        limit : 10,
                    },
                ),
            )).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource.slice(0,10).map(item => item.toDTO()),
                ),
            );
        });
    });
});
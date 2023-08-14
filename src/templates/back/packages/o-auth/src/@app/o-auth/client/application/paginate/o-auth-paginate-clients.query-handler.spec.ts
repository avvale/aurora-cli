import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { OAuthPaginateClientsQueryHandler } from './o-auth-paginate-clients.query-handler';
import { OAuthMockClientRepository } from '@app/o-auth/client/infrastructure/mock/o-auth-mock-client.repository';
import { OAuthIClientRepository } from '@app/o-auth/client/domain/o-auth-client.repository';
import { OAuthClientMapper } from '@app/o-auth/client/domain/o-auth-client.mapper';
import { OAuthPaginateClientsQuery } from './o-auth-paginate-clients.query';
import { OAuthPaginateClientsService } from './o-auth-paginate-clients.service';

describe('OAuthPaginateClientsQueryHandler', () =>
{
    let queryHandler: OAuthPaginateClientsQueryHandler;
    let service: OAuthPaginateClientsService;
    let repository: OAuthMockClientRepository;
    let mapper: OAuthClientMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthPaginateClientsQueryHandler,
                {
                    provide : OAuthIClientRepository,
                    useClass: OAuthMockClientRepository,
                },
                {
                    provide : OAuthPaginateClientsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthPaginateClientsQueryHandler>(OAuthPaginateClientsQueryHandler);
        service = module.get<OAuthPaginateClientsService>(OAuthPaginateClientsService);
        repository = <OAuthMockClientRepository>module.get<OAuthIClientRepository>(OAuthIClientRepository);
        mapper = new OAuthClientMapper();
    });

    describe('main', () =>
    {
        test('OAuthPaginateClientsQueryHandler should be defined', () =>
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
                new OAuthPaginateClientsQuery(
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

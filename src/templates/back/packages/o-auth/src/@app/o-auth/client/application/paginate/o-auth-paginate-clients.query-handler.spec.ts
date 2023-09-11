import { OAuthIClientRepository, OAuthMockClientRepository, OAuthPaginateClientsQuery } from '@app/o-auth/client';
import { OAuthPaginateClientsQueryHandler } from '@app/o-auth/client/application/paginate/o-auth-paginate-clients.query-handler';
import { OAuthPaginateClientsService } from '@app/o-auth/client/application/paginate/o-auth-paginate-clients.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthPaginateClientsQueryHandler', () =>
{
    let queryHandler: OAuthPaginateClientsQueryHandler;
    let service: OAuthPaginateClientsService;
    let repository: OAuthMockClientRepository;

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

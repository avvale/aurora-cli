import { OAuthIApplicationClientRepository, OAuthMockApplicationClientRepository, OAuthPaginateApplicationsClientsQuery } from '@app/o-auth/application-client';
import { OAuthPaginateApplicationsClientsQueryHandler } from '@app/o-auth/application-client/application/paginate/o-auth-paginate-applications-clients.query-handler';
import { OAuthPaginateApplicationsClientsService } from '@app/o-auth/application-client/application/paginate/o-auth-paginate-applications-clients.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthPaginateApplicationsClientsQueryHandler', () =>
{
    let queryHandler: OAuthPaginateApplicationsClientsQueryHandler;
    let service: OAuthPaginateApplicationsClientsService;
    let repository: OAuthMockApplicationClientRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthPaginateApplicationsClientsQueryHandler,
                {
                    provide : OAuthIApplicationClientRepository,
                    useClass: OAuthMockApplicationClientRepository,
                },
                {
                    provide : OAuthPaginateApplicationsClientsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthPaginateApplicationsClientsQueryHandler>(OAuthPaginateApplicationsClientsQueryHandler);
        service = module.get<OAuthPaginateApplicationsClientsService>(OAuthPaginateApplicationsClientsService);
        repository = <OAuthMockApplicationClientRepository>module.get<OAuthIApplicationClientRepository>(OAuthIApplicationClientRepository);
    });

    describe('main', () =>
    {
        test('OAuthPaginateApplicationsClientsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationsClients paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new OAuthPaginateApplicationsClientsQuery(
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

import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { OAuthPaginateApplicationsQueryHandler } from './o-auth-paginate-applications.query-handler';
import { OAuthMockApplicationRepository } from '@app/o-auth/application/infrastructure/mock/o-auth-mock-application.repository';
import { OAuthIApplicationRepository } from '@app/o-auth/application/domain/o-auth-application.repository';
import { OAuthApplicationMapper } from '@app/o-auth/application/domain/o-auth-application.mapper';
import { OAuthPaginateApplicationsQuery } from './o-auth-paginate-applications.query';
import { OAuthPaginateApplicationsService } from './o-auth-paginate-applications.service';

describe('OAuthPaginateApplicationsQueryHandler', () =>
{
    let queryHandler: OAuthPaginateApplicationsQueryHandler;
    let service: OAuthPaginateApplicationsService;
    let repository: OAuthMockApplicationRepository;
    let mapper: OAuthApplicationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthPaginateApplicationsQueryHandler,
                {
                    provide : OAuthIApplicationRepository,
                    useClass: OAuthMockApplicationRepository,
                },
                {
                    provide : OAuthPaginateApplicationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthPaginateApplicationsQueryHandler>(OAuthPaginateApplicationsQueryHandler);
        service = module.get<OAuthPaginateApplicationsService>(OAuthPaginateApplicationsService);
        repository = <OAuthMockApplicationRepository>module.get<OAuthIApplicationRepository>(OAuthIApplicationRepository);
        mapper = new OAuthApplicationMapper();
    });

    describe('main', () =>
    {
        test('OAuthPaginateApplicationsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applications paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new OAuthPaginateApplicationsQuery(
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

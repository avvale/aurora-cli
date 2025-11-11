import {
    OAuthIApplicationRepository,
    OAuthMockApplicationRepository,
    OAuthPaginateApplicationsQuery,
} from '@app/o-auth/application';
import { OAuthPaginateApplicationsQueryHandler } from '@app/o-auth/application/application/paginate/o-auth-paginate-applications.query-handler';
import { OAuthPaginateApplicationsService } from '@app/o-auth/application/application/paginate/o-auth-paginate-applications.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthPaginateApplicationsQueryHandler', () => {
    let queryHandler: OAuthPaginateApplicationsQueryHandler;
    let service: OAuthPaginateApplicationsService;
    let repository: OAuthMockApplicationRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthPaginateApplicationsQueryHandler,
                {
                    provide: OAuthIApplicationRepository,
                    useClass: OAuthMockApplicationRepository,
                },
                {
                    provide: OAuthPaginateApplicationsService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<OAuthPaginateApplicationsQueryHandler>(
            OAuthPaginateApplicationsQueryHandler,
        );
        service = module.get<OAuthPaginateApplicationsService>(
            OAuthPaginateApplicationsService,
        );
        repository = <OAuthMockApplicationRepository>(
            module.get<OAuthIApplicationRepository>(OAuthIApplicationRepository)
        );
    });

    describe('main', () => {
        test('OAuthPaginateApplicationsQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applications paginated', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            count: 10,
                            total: 100,
                            rows: repository.collectionSource.slice(0, 10),
                        }),
                    ),
            );
            expect(
                await queryHandler.execute(
                    new OAuthPaginateApplicationsQuery({
                        offset: 0,
                        limit: 10,
                    }),
                ),
            ).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource
                        .slice(0, 10)
                        .map((item) => item.toDTO()),
                ),
            );
        });
    });
});

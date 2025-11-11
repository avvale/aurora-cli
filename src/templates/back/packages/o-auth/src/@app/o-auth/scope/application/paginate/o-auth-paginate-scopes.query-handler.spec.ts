import {
    OAuthIScopeRepository,
    OAuthMockScopeRepository,
    OAuthPaginateScopesQuery,
} from '@app/o-auth/scope';
import { OAuthPaginateScopesQueryHandler } from '@app/o-auth/scope/application/paginate/o-auth-paginate-scopes.query-handler';
import { OAuthPaginateScopesService } from '@app/o-auth/scope/application/paginate/o-auth-paginate-scopes.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthPaginateScopesQueryHandler', () => {
    let queryHandler: OAuthPaginateScopesQueryHandler;
    let service: OAuthPaginateScopesService;
    let repository: OAuthMockScopeRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthPaginateScopesQueryHandler,
                {
                    provide: OAuthIScopeRepository,
                    useClass: OAuthMockScopeRepository,
                },
                {
                    provide: OAuthPaginateScopesService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<OAuthPaginateScopesQueryHandler>(
            OAuthPaginateScopesQueryHandler,
        );
        service = module.get<OAuthPaginateScopesService>(
            OAuthPaginateScopesService,
        );
        repository = <OAuthMockScopeRepository>(
            module.get<OAuthIScopeRepository>(OAuthIScopeRepository)
        );
    });

    describe('main', () => {
        test('OAuthPaginateScopesQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an scopes paginated', async () => {
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
                    new OAuthPaginateScopesQuery({
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

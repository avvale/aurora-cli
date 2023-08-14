import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { OAuthPaginateScopesQueryHandler } from './o-auth-paginate-scopes.query-handler';
import { OAuthMockScopeRepository } from '@app/o-auth/scope/infrastructure/mock/o-auth-mock-scope.repository';
import { OAuthIScopeRepository } from '@app/o-auth/scope/domain/o-auth-scope.repository';
import { OAuthScopeMapper } from '@app/o-auth/scope/domain/o-auth-scope.mapper';
import { OAuthPaginateScopesQuery } from './o-auth-paginate-scopes.query';
import { OAuthPaginateScopesService } from './o-auth-paginate-scopes.service';

describe('OAuthPaginateScopesQueryHandler', () =>
{
    let queryHandler: OAuthPaginateScopesQueryHandler;
    let service: OAuthPaginateScopesService;
    let repository: OAuthMockScopeRepository;
    let mapper: OAuthScopeMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthPaginateScopesQueryHandler,
                {
                    provide : OAuthIScopeRepository,
                    useClass: OAuthMockScopeRepository,
                },
                {
                    provide : OAuthPaginateScopesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthPaginateScopesQueryHandler>(OAuthPaginateScopesQueryHandler);
        service = module.get<OAuthPaginateScopesService>(OAuthPaginateScopesService);
        repository = <OAuthMockScopeRepository>module.get<OAuthIScopeRepository>(OAuthIScopeRepository);
        mapper = new OAuthScopeMapper();
    });

    describe('main', () =>
    {
        test('OAuthPaginateScopesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an scopes paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new OAuthPaginateScopesQuery(
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

import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthGetScopesQueryHandler } from './o-auth-get-scopes.query-handler';
import { OAuthMockScopeRepository } from '@app/o-auth/scope/infrastructure/mock/o-auth-mock-scope.repository';
import { OAuthIScopeRepository } from '@app/o-auth/scope/domain/o-auth-scope.repository';
import { OAuthScopeMapper } from '@app/o-auth/scope/domain/o-auth-scope.mapper';
import { OAuthGetScopesQuery } from './o-auth-get-scopes.query';
import { OAuthGetScopesService } from './o-auth-get-scopes.service';

describe('GetScopesQueryHandler', () =>
{
    let queryHandler: OAuthGetScopesQueryHandler;
    let service: OAuthGetScopesService;
    let repository: OAuthMockScopeRepository;
    let mapper: OAuthScopeMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthGetScopesQueryHandler,
                {
                    provide : OAuthIScopeRepository,
                    useClass: OAuthMockScopeRepository,
                },
                {
                    provide : OAuthGetScopesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthGetScopesQueryHandler>(OAuthGetScopesQueryHandler);
        service = module.get<OAuthGetScopesService>(OAuthGetScopesService);
        repository = <OAuthMockScopeRepository>module.get<OAuthIScopeRepository>(OAuthIScopeRepository);
        mapper = new OAuthScopeMapper();
    });

    describe('main', () =>
    {
        test('OAuthGetScopesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an scopes founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new OAuthGetScopesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
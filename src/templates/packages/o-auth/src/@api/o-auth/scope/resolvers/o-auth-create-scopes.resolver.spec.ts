import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthCreateScopesResolver } from './o-auth-create-scopes.resolver';
import { OAuthCreateScopesHandler } from '../handlers/o-auth-create-scopes.handler';
import { OAuthCreateScopeInput } from '../../../../graphql';

// sources
import { scopes } from '../../../../@apps/o-auth/scope/infrastructure/seeds/scope.seed';

describe('OAuthCreateScopesResolver', () =>
{
    let resolver: OAuthCreateScopesResolver;
    let handler: OAuthCreateScopesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthCreateScopesResolver,
                {
                    provide : OAuthCreateScopesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<OAuthCreateScopesResolver>(OAuthCreateScopesResolver);
        handler = module.get<OAuthCreateScopesHandler>(OAuthCreateScopesHandler);
    });

    test('OAuthCreateScopesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthCreateScopesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an scopes created', async () =>
        {
            expect(await resolver.main(<OAuthCreateScopeInput[]>scopes)).toBe(undefined);
        });
    });
});
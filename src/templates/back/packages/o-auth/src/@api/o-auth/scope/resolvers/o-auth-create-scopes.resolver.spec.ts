import { OAuthCreateScopeInput } from '@api/graphql';
import { OAuthCreateScopesHandler, OAuthCreateScopesResolver } from '@api/o-auth/scope';
import { oAuthMockScopeData } from '@app/o-auth/scope';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateScopesResolver', () =>
{
    let resolver: OAuthCreateScopesResolver;

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
        })
            .compile();

        resolver = module.get<OAuthCreateScopesResolver>(OAuthCreateScopesResolver);
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
            expect(await resolver.main(<OAuthCreateScopeInput[]>oAuthMockScopeData)).toBe(undefined);
        });
    });
});

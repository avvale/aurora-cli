/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthUpdateScopesInput } from '@api/graphql';
import { OAuthUpdateScopesHandler, OAuthUpdateScopesResolver } from '@api/o-auth/scope';
import { oAuthMockScopeData } from '@app/o-auth/scope';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateScopesResolver', () =>
{
    let resolver: OAuthUpdateScopesResolver;
    let handler: OAuthUpdateScopesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateScopesResolver,
                {
                    provide : OAuthUpdateScopesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthUpdateScopesResolver>(OAuthUpdateScopesResolver);
        handler = module.get<OAuthUpdateScopesHandler>(OAuthUpdateScopesHandler);
    });

    test('OAuthUpdateScopesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateScopesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a scopes updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockScopeData[0])));
            expect(await resolver.main(<OAuthUpdateScopesInput>oAuthMockScopeData[0])).toBe(oAuthMockScopeData[0]);
        });
    });
});

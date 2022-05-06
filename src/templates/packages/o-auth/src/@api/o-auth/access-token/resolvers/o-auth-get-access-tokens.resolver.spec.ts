/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthGetAccessTokensResolver } from './o-auth-get-access-tokens.resolver';
import { OAuthGetAccessTokensHandler } from '../handlers/o-auth-get-access-tokens.handler';

// sources
import { accessTokens } from '@apps/o-auth/access-token/infrastructure/seeds/access-token.seed';

describe('OAuthGetAccessTokensResolver', () =>
{
    let resolver: OAuthGetAccessTokensResolver;
    let handler: OAuthGetAccessTokensHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthGetAccessTokensResolver,
                {
                    provide : OAuthGetAccessTokensHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthGetAccessTokensResolver>(OAuthGetAccessTokensResolver);
        handler = module.get<OAuthGetAccessTokensHandler>(OAuthGetAccessTokensHandler);
    });

    test('OAuthGetAccessTokensResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthGetAccessTokensResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a accessTokens', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accessTokens)));
            expect(await resolver.main()).toBe(accessTokens);
        });
    });
});
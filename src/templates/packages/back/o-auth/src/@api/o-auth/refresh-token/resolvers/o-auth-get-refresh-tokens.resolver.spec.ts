/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthGetRefreshTokensResolver } from './o-auth-get-refresh-tokens.resolver';
import { OAuthGetRefreshTokensHandler } from '../handlers/o-auth-get-refresh-tokens.handler';

// sources
import { refreshTokens } from '@app/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';

describe('OAuthGetRefreshTokensResolver', () =>
{
    let resolver: OAuthGetRefreshTokensResolver;
    let handler: OAuthGetRefreshTokensHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthGetRefreshTokensResolver,
                {
                    provide : OAuthGetRefreshTokensHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthGetRefreshTokensResolver>(OAuthGetRefreshTokensResolver);
        handler = module.get<OAuthGetRefreshTokensHandler>(OAuthGetRefreshTokensHandler);
    });

    test('OAuthGetRefreshTokensResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthGetRefreshTokensResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a refreshTokens', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(refreshTokens)));
            expect(await resolver.main()).toBe(refreshTokens);
        });
    });
});
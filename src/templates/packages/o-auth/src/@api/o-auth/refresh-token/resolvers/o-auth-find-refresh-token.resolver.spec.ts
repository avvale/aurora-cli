/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindRefreshTokenResolver } from './o-auth-find-refresh-token.resolver';
import { OAuthFindRefreshTokenHandler } from '../handlers/o-auth-find-refresh-token.handler';

// sources
import { refreshTokens } from '../../../../@apps/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';

describe('OAuthFindRefreshTokenResolver', () =>
{
    let resolver: OAuthFindRefreshTokenResolver;
    let handler: OAuthFindRefreshTokenHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthFindRefreshTokenResolver,
                {
                    provide : OAuthFindRefreshTokenHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthFindRefreshTokenResolver>(OAuthFindRefreshTokenResolver);
        handler = module.get<OAuthFindRefreshTokenHandler>(OAuthFindRefreshTokenHandler);
    });

    test('OAuthFindRefreshTokenResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthFindRefreshTokenResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a refreshToken', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(refreshTokens[0])));
            expect(await resolver.main()).toBe(refreshTokens[0]);
        });
    });
});
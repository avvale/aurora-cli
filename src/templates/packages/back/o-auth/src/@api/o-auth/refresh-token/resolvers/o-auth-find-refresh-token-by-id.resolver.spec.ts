/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindRefreshTokenByIdResolver } from './o-auth-find-refresh-token-by-id.resolver';
import { OAuthFindRefreshTokenByIdHandler } from '../handlers/o-auth-find-refresh-token-by-id.handler';

// sources
import { refreshTokens } from '@app/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';

describe('OAuthFindRefreshTokenByIdResolver', () =>
{
    let resolver: OAuthFindRefreshTokenByIdResolver;
    let handler: OAuthFindRefreshTokenByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthFindRefreshTokenByIdResolver,
                {
                    provide : OAuthFindRefreshTokenByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthFindRefreshTokenByIdResolver>(OAuthFindRefreshTokenByIdResolver);
        handler = module.get<OAuthFindRefreshTokenByIdHandler>(OAuthFindRefreshTokenByIdHandler);
    });

    test('OAuthFindRefreshTokenByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthFindRefreshTokenByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an refreshToken by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(refreshTokens[0])));
            expect(await resolver.main(refreshTokens[0].id)).toBe(refreshTokens[0]);
        });
    });
});
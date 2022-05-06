/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteRefreshTokenByIdResolver } from './o-auth-delete-refresh-token-by-id.resolver';
import { OAuthDeleteRefreshTokenByIdHandler } from '../handlers/o-auth-delete-refresh-token-by-id.handler';

// sources
import { refreshTokens } from '@apps/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';

describe('OAuthDeleteRefreshTokenByIdResolver', () =>
{
    let resolver: OAuthDeleteRefreshTokenByIdResolver;
    let handler: OAuthDeleteRefreshTokenByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthDeleteRefreshTokenByIdResolver,
                {
                    provide : OAuthDeleteRefreshTokenByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthDeleteRefreshTokenByIdResolver>(OAuthDeleteRefreshTokenByIdResolver);
        handler = module.get<OAuthDeleteRefreshTokenByIdHandler>(OAuthDeleteRefreshTokenByIdHandler);
    });

    test('OAuthDeleteRefreshTokenByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthDeleteRefreshTokenByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an refreshToken deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(refreshTokens[0])));
            expect(await resolver.main(refreshTokens[0].id)).toBe(refreshTokens[0]);
        });
    });
});
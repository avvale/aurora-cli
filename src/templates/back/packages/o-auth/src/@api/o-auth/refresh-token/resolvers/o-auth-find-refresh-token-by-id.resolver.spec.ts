/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthFindRefreshTokenByIdHandler, OAuthFindRefreshTokenByIdResolver } from '@api/o-auth/refresh-token';
import { oAuthMockRefreshTokenData } from '@app/o-auth/refresh-token';
import { Test, TestingModule } from '@nestjs/testing';

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
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockRefreshTokenData[0])));
            expect(await resolver.main(oAuthMockRefreshTokenData[0].id)).toBe(oAuthMockRefreshTokenData[0]);
        });
    });
});

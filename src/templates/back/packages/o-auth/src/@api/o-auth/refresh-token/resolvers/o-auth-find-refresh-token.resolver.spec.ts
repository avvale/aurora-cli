/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    OAuthFindRefreshTokenHandler,
    OAuthFindRefreshTokenResolver,
} from '@api/o-auth/refresh-token';
import { oAuthMockRefreshTokenData } from '@app/o-auth/refresh-token';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindRefreshTokenResolver', () => {
    let resolver: OAuthFindRefreshTokenResolver;
    let handler: OAuthFindRefreshTokenHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                OAuthFindRefreshTokenResolver,
                {
                    provide: OAuthFindRefreshTokenHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<OAuthFindRefreshTokenResolver>(
            OAuthFindRefreshTokenResolver,
        );
        handler = module.get<OAuthFindRefreshTokenHandler>(
            OAuthFindRefreshTokenHandler,
        );
    });

    test('OAuthFindRefreshTokenResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('OAuthFindRefreshTokenResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a refreshToken', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(oAuthMockRefreshTokenData[0]),
                    ),
            );
            expect(await resolver.main()).toBe(oAuthMockRefreshTokenData[0]);
        });
    });
});

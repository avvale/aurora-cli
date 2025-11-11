/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    OAuthPaginateRefreshTokensHandler,
    OAuthPaginateRefreshTokensResolver,
} from '@api/o-auth/refresh-token';
import { oAuthMockRefreshTokenData } from '@app/o-auth/refresh-token';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthPaginateRefreshTokensResolver', () => {
    let resolver: OAuthPaginateRefreshTokensResolver;
    let handler: OAuthPaginateRefreshTokensHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                OAuthPaginateRefreshTokensResolver,
                {
                    provide: OAuthPaginateRefreshTokensHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<OAuthPaginateRefreshTokensResolver>(
            OAuthPaginateRefreshTokensResolver,
        );
        handler = module.get<OAuthPaginateRefreshTokensHandler>(
            OAuthPaginateRefreshTokensHandler,
        );
    });

    test('OAuthPaginateRefreshTokensResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('OAuthPaginateRefreshTokensResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a oAuthMockRefreshTokenData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: 5,
                            count: 5,
                            rows: oAuthMockRefreshTokenData,
                        }),
                    ),
            );
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows: oAuthMockRefreshTokenData,
            });
        });
    });
});

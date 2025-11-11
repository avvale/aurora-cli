/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthPaginateRefreshTokensHandler } from '@api/o-auth/refresh-token';
import { oAuthMockRefreshTokenData } from '@app/o-auth/refresh-token';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthPaginateRefreshTokensHandler', () => {
    let handler: OAuthPaginateRefreshTokensHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                OAuthPaginateRefreshTokensHandler,
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        handler = module.get<OAuthPaginateRefreshTokensHandler>(
            OAuthPaginateRefreshTokensHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('OAuthPaginateRefreshTokensHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('OAuthPaginateRefreshTokensHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a refreshTokens', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: oAuthMockRefreshTokenData.length,
                            count: oAuthMockRefreshTokenData.length,
                            rows: oAuthMockRefreshTokenData,
                        }),
                    ),
            );
            expect(await handler.main({}, {})).toEqual({
                total: oAuthMockRefreshTokenData.length,
                count: oAuthMockRefreshTokenData.length,
                rows: oAuthMockRefreshTokenData,
            });
        });
    });
});

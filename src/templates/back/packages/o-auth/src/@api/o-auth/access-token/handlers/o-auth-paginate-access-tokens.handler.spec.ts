/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthPaginateAccessTokensHandler } from '@api/o-auth/access-token';
import { oAuthMockAccessTokenData } from '@app/o-auth/access-token';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthPaginateAccessTokensHandler', () =>
{
    let handler: OAuthPaginateAccessTokensHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthPaginateAccessTokensHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<OAuthPaginateAccessTokensHandler>(OAuthPaginateAccessTokensHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('OAuthPaginateAccessTokensHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthPaginateAccessTokensHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a accessTokens', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: oAuthMockAccessTokenData.length,
                count: oAuthMockAccessTokenData.length,
                rows : oAuthMockAccessTokenData,
            })));
            expect(
                await handler.main(
                    {},
                    {},
                ),
            )
                .toEqual({
                    total: oAuthMockAccessTokenData.length,
                    count: oAuthMockAccessTokenData.length,
                    rows : oAuthMockAccessTokenData,
                });
        });
    });
});

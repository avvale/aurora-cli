/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthGetAccessTokensHandler } from '@api/o-auth/access-token';
import { oAuthMockAccessTokenData } from '@app/o-auth/access-token';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthGetAccessTokensHandler', () =>
{
    let handler: OAuthGetAccessTokensHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthGetAccessTokensHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<OAuthGetAccessTokensHandler>(OAuthGetAccessTokensHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('OAuthGetAccessTokensHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthGetAccessTokensHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a oAuthMockAccessTokenData', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(oAuthMockAccessTokenData)));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(oAuthMockAccessTokenData);
        });
    });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthFindRefreshTokenHandler } from '@api/o-auth/refresh-token';
import { oAuthMockRefreshTokenData } from '@app/o-auth/refresh-token';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindRefreshTokenHandler', () =>
{
    let handler: OAuthFindRefreshTokenHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthFindRefreshTokenHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<OAuthFindRefreshTokenHandler>(OAuthFindRefreshTokenHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('OAuthFindRefreshTokenHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthFindRefreshTokenHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a refreshToken', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(oAuthMockRefreshTokenData[0])));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(oAuthMockRefreshTokenData[0]);
        });
    });
});

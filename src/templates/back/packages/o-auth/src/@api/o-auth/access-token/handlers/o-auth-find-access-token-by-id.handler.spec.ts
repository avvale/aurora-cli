/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthFindAccessTokenByIdHandler } from '@api/o-auth/access-token';
import { oAuthMockAccessTokenData } from '@app/o-auth/access-token';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindAccessTokenByIdHandler', () =>
{
    let handler: OAuthFindAccessTokenByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthFindAccessTokenByIdHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<OAuthFindAccessTokenByIdHandler>(OAuthFindAccessTokenByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('OAuthFindAccessTokenByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthFindAccessTokenByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an accessToken by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(oAuthMockAccessTokenData[0])));
            expect(
                await handler.main(
                    oAuthMockAccessTokenData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(oAuthMockAccessTokenData[0]);
        });
    });
});

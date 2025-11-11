/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthFindAccessTokenHandler } from '@api/o-auth/access-token';
import { oAuthMockAccessTokenData } from '@app/o-auth/access-token';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindAccessTokenHandler', () => {
    let handler: OAuthFindAccessTokenHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                OAuthFindAccessTokenHandler,
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

        handler = module.get<OAuthFindAccessTokenHandler>(
            OAuthFindAccessTokenHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('OAuthFindAccessTokenHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('OAuthFindAccessTokenHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a accessToken', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(oAuthMockAccessTokenData[0]),
                    ),
            );
            expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
                oAuthMockAccessTokenData[0],
            );
        });
    });
});

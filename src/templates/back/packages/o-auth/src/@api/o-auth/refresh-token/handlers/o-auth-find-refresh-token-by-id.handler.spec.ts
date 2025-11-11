/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthFindRefreshTokenByIdHandler } from '@api/o-auth/refresh-token';
import { oAuthMockRefreshTokenData } from '@app/o-auth/refresh-token';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindRefreshTokenByIdHandler', () => {
    let handler: OAuthFindRefreshTokenByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                OAuthFindRefreshTokenByIdHandler,
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

        handler = module.get<OAuthFindRefreshTokenByIdHandler>(
            OAuthFindRefreshTokenByIdHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('OAuthFindRefreshTokenByIdHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('OAuthFindRefreshTokenByIdHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an refreshToken by id', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(oAuthMockRefreshTokenData[0]),
                    ),
            );
            expect(
                await handler.main(
                    oAuthMockRefreshTokenData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(oAuthMockRefreshTokenData[0]);
        });
    });
});

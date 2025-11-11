/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthPaginateClientsHandler } from '@api/o-auth/client';
import { oAuthMockClientData } from '@app/o-auth/client';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthPaginateClientsHandler', () => {
    let handler: OAuthPaginateClientsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                OAuthPaginateClientsHandler,
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

        handler = module.get<OAuthPaginateClientsHandler>(
            OAuthPaginateClientsHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('OAuthPaginateClientsHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('OAuthPaginateClientsHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a clients', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: oAuthMockClientData.length,
                            count: oAuthMockClientData.length,
                            rows: oAuthMockClientData,
                        }),
                    ),
            );
            expect(await handler.main({}, {})).toEqual({
                total: oAuthMockClientData.length,
                count: oAuthMockClientData.length,
                rows: oAuthMockClientData,
            });
        });
    });
});

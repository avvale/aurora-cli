/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthPaginateApplicationsClientsHandler } from '@api/o-auth/application-client';
import { oAuthMockApplicationClientData } from '@app/o-auth/application-client';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthPaginateApplicationsClientsHandler', () => {
    let handler: OAuthPaginateApplicationsClientsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                OAuthPaginateApplicationsClientsHandler,
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

        handler = module.get<OAuthPaginateApplicationsClientsHandler>(
            OAuthPaginateApplicationsClientsHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('OAuthPaginateApplicationsClientsHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('OAuthPaginateApplicationsClientsHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a applicationsClients', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: oAuthMockApplicationClientData.length,
                            count: oAuthMockApplicationClientData.length,
                            rows: oAuthMockApplicationClientData,
                        }),
                    ),
            );
            expect(await handler.main({}, {})).toEqual({
                total: oAuthMockApplicationClientData.length,
                count: oAuthMockApplicationClientData.length,
                rows: oAuthMockApplicationClientData,
            });
        });
    });
});

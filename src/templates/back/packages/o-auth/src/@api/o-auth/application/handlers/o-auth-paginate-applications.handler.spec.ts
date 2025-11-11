/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthPaginateApplicationsHandler } from '@api/o-auth/application';
import { oAuthMockApplicationData } from '@app/o-auth/application';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthPaginateApplicationsHandler', () => {
    let handler: OAuthPaginateApplicationsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                OAuthPaginateApplicationsHandler,
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

        handler = module.get<OAuthPaginateApplicationsHandler>(
            OAuthPaginateApplicationsHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('OAuthPaginateApplicationsHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('OAuthPaginateApplicationsHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a applications', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: oAuthMockApplicationData.length,
                            count: oAuthMockApplicationData.length,
                            rows: oAuthMockApplicationData,
                        }),
                    ),
            );
            expect(await handler.main({}, {})).toEqual({
                total: oAuthMockApplicationData.length,
                count: oAuthMockApplicationData.length,
                rows: oAuthMockApplicationData,
            });
        });
    });
});

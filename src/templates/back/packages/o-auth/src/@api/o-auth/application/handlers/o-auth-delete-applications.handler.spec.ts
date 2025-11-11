/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthDeleteApplicationsHandler } from '@api/o-auth/application';
import { oAuthMockApplicationData } from '@app/o-auth/application';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteApplicationsHandler', () => {
    let handler: OAuthDeleteApplicationsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                OAuthDeleteApplicationsHandler,
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {
                            /**/
                        },
                    },
                },
                {
                    provide: ICommandBus,
                    useValue: {
                        dispatch: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        handler = module.get<OAuthDeleteApplicationsHandler>(
            OAuthDeleteApplicationsHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('OAuthDeleteApplicationsHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('OAuthDeleteApplicationsHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an oAuthMockApplicationData deleted', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(oAuthMockApplicationData)),
            );
            expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
                oAuthMockApplicationData,
            );
        });
    });
});

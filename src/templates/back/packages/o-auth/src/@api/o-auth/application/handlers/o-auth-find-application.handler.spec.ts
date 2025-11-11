/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthFindApplicationHandler } from '@api/o-auth/application';
import { oAuthMockApplicationData } from '@app/o-auth/application';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindApplicationHandler', () => {
    let handler: OAuthFindApplicationHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                OAuthFindApplicationHandler,
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

        handler = module.get<OAuthFindApplicationHandler>(
            OAuthFindApplicationHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('OAuthFindApplicationHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('OAuthFindApplicationHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a application', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(oAuthMockApplicationData[0]),
                    ),
            );
            expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
                oAuthMockApplicationData[0],
            );
        });
    });
});

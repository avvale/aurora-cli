/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthDeleteApplicationClientByIdHandler } from '@api/o-auth/application-client';
import { oAuthMockApplicationClientData } from '@app/o-auth/application-client';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteApplicationClientByIdController', () => {
    let handler: OAuthDeleteApplicationClientByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                OAuthDeleteApplicationClientByIdHandler,
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

        handler = module.get<OAuthDeleteApplicationClientByIdHandler>(
            OAuthDeleteApplicationClientByIdHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () => {
        test('OAuthDeleteApplicationClientByIdHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an applicationClient deleted', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(oAuthMockApplicationClientData[0]),
                    ),
            );
            expect(
                await handler.main(
                    oAuthMockApplicationClientData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(oAuthMockApplicationClientData[0]);
        });
    });
});

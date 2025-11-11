/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthCreateClientHandler } from '@api/o-auth/client';
import { oAuthMockClientData } from '@app/o-auth/client';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateClientHandler', () => {
    let handler: OAuthCreateClientHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                OAuthCreateClientHandler,
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

        handler = module.get<OAuthCreateClientHandler>(
            OAuthCreateClientHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () => {
        test('OAuthCreateClientHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an client created', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () => new Promise((resolve) => resolve(oAuthMockClientData[0])),
            );
            expect(
                await handler.main(oAuthMockClientData[0], 'Europe/Madrid'),
            ).toBe(oAuthMockClientData[0]);
        });
    });
});

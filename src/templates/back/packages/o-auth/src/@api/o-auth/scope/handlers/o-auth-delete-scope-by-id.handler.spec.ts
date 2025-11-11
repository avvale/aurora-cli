/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthDeleteScopeByIdHandler } from '@api/o-auth/scope';
import { oAuthMockScopeData } from '@app/o-auth/scope';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteScopeByIdController', () => {
    let handler: OAuthDeleteScopeByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                OAuthDeleteScopeByIdHandler,
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

        handler = module.get<OAuthDeleteScopeByIdHandler>(
            OAuthDeleteScopeByIdHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () => {
        test('OAuthDeleteScopeByIdHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an scope deleted', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () => new Promise((resolve) => resolve(oAuthMockScopeData[0])),
            );
            expect(
                await handler.main(
                    oAuthMockScopeData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(oAuthMockScopeData[0]);
        });
    });
});

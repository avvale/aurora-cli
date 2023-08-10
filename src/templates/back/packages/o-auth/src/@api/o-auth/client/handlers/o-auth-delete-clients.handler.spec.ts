/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthDeleteClientsHandler } from '@api/o-auth/client';
import { oAuthMockClientData } from '@app/o-auth/client';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteClientsHandler', () =>
{
    let handler: OAuthDeleteClientsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthDeleteClientsHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<OAuthDeleteClientsHandler>(OAuthDeleteClientsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('OAuthDeleteClientsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthDeleteClientsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an oAuthMockClientData deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(oAuthMockClientData)));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(oAuthMockClientData);
        });
    });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthUpdateClientsInput } from '@api/graphql';
import { OAuthUpdateClientsHandler } from '@api/o-auth/client';
import { oAuthMockClientData } from '@app/o-auth/client';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateClientsHandler', () =>
{
    let handler: OAuthUpdateClientsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateClientsHandler,
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

        handler = module.get<OAuthUpdateClientsHandler>(OAuthUpdateClientsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('OAuthUpdateClientsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateClientsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a clients updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(oAuthMockClientData[0])));
            expect(
                await handler.main(
                    <OAuthUpdateClientsInput>oAuthMockClientData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(oAuthMockClientData[0]);
        });
    });
});

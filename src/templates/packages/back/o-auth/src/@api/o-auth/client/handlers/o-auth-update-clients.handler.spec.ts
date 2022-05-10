/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { OAuthUpdateClientsHandler } from './o-auth-update-clients.handler';
import { OAuthUpdateClientsInput } from '../../../../graphql';

// sources
import { clients } from '@apps/o-auth/client/infrastructure/seeds/client.seed';

describe('OAuthUpdateClientsHandler', () =>
{
    let handler: OAuthUpdateClientsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

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

        handler     = module.get<OAuthUpdateClientsHandler>(OAuthUpdateClientsHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
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
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(clients[0])));
            expect(await handler.main(<OAuthUpdateClientsInput>clients[0])).toBe(clients[0]);
        });
    });
});
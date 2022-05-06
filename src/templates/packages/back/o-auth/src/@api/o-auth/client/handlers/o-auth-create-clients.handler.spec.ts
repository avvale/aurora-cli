import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { OAuthCreateClientsHandler } from './o-auth-create-clients.handler';
import { clients } from '@apps/o-auth/client/infrastructure/seeds/client.seed';

describe('OAuthCreateClientsHandler', () =>
{
    let handler: OAuthCreateClientsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthCreateClientsHandler,
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

        handler     = module.get<OAuthCreateClientsHandler>(OAuthCreateClientsHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('OAuthCreateClientsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an clients created', async () =>
        {
            expect(await handler.main(clients)).toBe(true);
        });
    });
});
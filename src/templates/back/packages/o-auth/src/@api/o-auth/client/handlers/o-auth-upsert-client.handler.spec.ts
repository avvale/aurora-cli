/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { OAuthUpsertClientHandler } from './o-auth-upsert-client.handler';

// sources
import { clients } from '@app/o-auth/client/infrastructure/mock/mock-client.data';

describe('OAuthUpsertClientHandler', () =>
{
    let handler: OAuthUpsertClientHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpsertClientHandler,
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

        handler     = module.get<OAuthUpsertClientHandler>(OAuthUpsertClientHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('OAuthUpsertClientHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an client upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(clients[0])));
            expect(await handler.main(clients[0])).toBe(clients[0]);
        });
    });
});
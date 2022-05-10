/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { OAuthUpdateClientByIdHandler } from './o-auth-update-client-by-id.handler';
import { OAuthUpdateClientByIdInput } from '../../../../graphql';

// sources
import { clients } from '@apps/o-auth/client/infrastructure/seeds/client.seed';

describe('OAuthUpdateClientByIdHandler', () =>
{
    let handler: OAuthUpdateClientByIdHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateClientByIdHandler,
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

        handler     = module.get<OAuthUpdateClientByIdHandler>(OAuthUpdateClientByIdHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthUpdateClientByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateClientByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a client updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(clients[0])));
            expect(await handler.main(<OAuthUpdateClientByIdInput>clients[0])).toBe(clients[0]);
        });
    });
});
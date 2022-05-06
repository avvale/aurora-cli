/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { OAuthGetScopesHandler } from './o-auth-get-scopes.handler';

// sources
import { scopes } from '../../../../@apps/o-auth/scope/infrastructure/seeds/scope.seed';

describe('OAuthGetScopesHandler', () =>
{
    let handler: OAuthGetScopesHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthGetScopesHandler,
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

        handler = module.get<OAuthGetScopesHandler>(OAuthGetScopesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthGetScopesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthGetScopesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a scopes', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(scopes)));
            expect(await handler.main()).toBe(scopes);
        });
    });
});
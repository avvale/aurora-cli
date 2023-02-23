/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

// custom items
import { OAuthUpsertScopeHandler } from './o-auth-upsert-scope.handler';

// sources
import { scopes } from '@app/o-auth/scope/infrastructure/seeds/scope.seed';

describe('OAuthUpsertScopeHandler', () =>
{
    let handler: OAuthUpsertScopeHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpsertScopeHandler,
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

        handler     = module.get<OAuthUpsertScopeHandler>(OAuthUpsertScopeHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('OAuthUpsertScopeHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an scope upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(scopes[0])));
            expect(await handler.main(scopes[0])).toBe(scopes[0]);
        });
    });
});
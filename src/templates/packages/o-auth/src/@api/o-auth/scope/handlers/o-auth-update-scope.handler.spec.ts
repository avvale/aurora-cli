/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { OAuthUpdateScopeHandler } from './o-auth-update-scope.handler';
import { OAuthUpdateScopeInput } from '../../../../graphql';

// sources
import { scopes } from '../../../../@apps/o-auth/scope/infrastructure/seeds/scope.seed';

describe('OAuthUpdateScopeHandler', () =>
{
    let handler: OAuthUpdateScopeHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateScopeHandler,
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

        handler     = module.get<OAuthUpdateScopeHandler>(OAuthUpdateScopeHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthUpdateScopeHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateScopeHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a scope updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(scopes[0])));
            expect(await handler.main(<OAuthUpdateScopeInput>scopes[0])).toBe(scopes[0]);
        });
    });
});
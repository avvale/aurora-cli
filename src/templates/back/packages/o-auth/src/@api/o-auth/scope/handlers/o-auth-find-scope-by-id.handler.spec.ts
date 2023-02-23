/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

// custom items
import { OAuthFindScopeByIdHandler } from './o-auth-find-scope-by-id.handler';

// sources
import { scopes } from '@app/o-auth/scope/infrastructure/seeds/scope.seed';

describe('OAuthFindScopeByIdHandler', () =>
{
    let handler: OAuthFindScopeByIdHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthFindScopeByIdHandler,
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

        handler = module.get<OAuthFindScopeByIdHandler>(OAuthFindScopeByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthFindScopeByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthFindScopeByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an scope by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(scopes[0])));
            expect(await handler.main(scopes[0].id)).toBe(scopes[0]);
        });
    });
});
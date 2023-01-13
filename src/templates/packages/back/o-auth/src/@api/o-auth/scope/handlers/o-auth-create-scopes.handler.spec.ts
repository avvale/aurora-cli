import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

// custom items
import { OAuthCreateScopesHandler } from './o-auth-create-scopes.handler';
import { scopes } from '@app/o-auth/scope/infrastructure/seeds/scope.seed';

describe('OAuthCreateScopesHandler', () =>
{
    let handler: OAuthCreateScopesHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthCreateScopesHandler,
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

        handler     = module.get<OAuthCreateScopesHandler>(OAuthCreateScopesHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('OAuthCreateScopesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an scopes created', async () =>
        {
            expect(await handler.main(scopes)).toBe(true);
        });
    });
});
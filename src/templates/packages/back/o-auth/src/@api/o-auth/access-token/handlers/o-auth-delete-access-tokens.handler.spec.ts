/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

// custom items
import { OAuthDeleteAccessTokensHandler } from './o-auth-delete-access-tokens.handler';

// sources
import { accessTokens } from '@app/o-auth/access-token/infrastructure/seeds/access-token.seed';

describe('OAuthDeleteAccessTokensHandler', () =>
{
    let handler: OAuthDeleteAccessTokensHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthDeleteAccessTokensHandler,
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

        handler    = module.get<OAuthDeleteAccessTokensHandler>(OAuthDeleteAccessTokensHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthDeleteAccessTokensHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthDeleteAccessTokensHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an accessTokens deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(accessTokens)));
            expect(await handler.main()).toBe(accessTokens);
        });
    });
});
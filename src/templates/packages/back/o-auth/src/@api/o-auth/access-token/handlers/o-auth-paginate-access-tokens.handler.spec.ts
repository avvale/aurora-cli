/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { OAuthPaginateAccessTokensHandler } from './o-auth-paginate-access-tokens.handler';

// sources
import { accessTokens } from '@apps/o-auth/access-token/infrastructure/seeds/access-token.seed';

describe('OAuthPaginateAccessTokensHandler', () =>
{
    let handler: OAuthPaginateAccessTokensHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthPaginateAccessTokensHandler,
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

        handler = module.get<OAuthPaginateAccessTokensHandler>(OAuthPaginateAccessTokensHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthPaginateAccessTokensHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthPaginateAccessTokensHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a accessTokens', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: accessTokens.length,
                count: accessTokens.length,
                rows : accessTokens,
            })));
            expect(await handler.main()).toEqual({
                total: accessTokens.length,
                count: accessTokens.length,
                rows : accessTokens,
            });
        });
    });
});
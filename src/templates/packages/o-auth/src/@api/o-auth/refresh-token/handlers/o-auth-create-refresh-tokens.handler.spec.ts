import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { OAuthCreateRefreshTokensHandler } from './o-auth-create-refresh-tokens.handler';
import { refreshTokens } from '../../../../@apps/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';

describe('OAuthCreateRefreshTokensHandler', () =>
{
    let handler: OAuthCreateRefreshTokensHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthCreateRefreshTokensHandler,
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
        }).compile();

        handler     = module.get<OAuthCreateRefreshTokensHandler>(OAuthCreateRefreshTokensHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('OAuthCreateRefreshTokensHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an refreshTokens created', async () =>
        {
            expect(await handler.main(refreshTokens)).toBe(true);
        });
    });
});
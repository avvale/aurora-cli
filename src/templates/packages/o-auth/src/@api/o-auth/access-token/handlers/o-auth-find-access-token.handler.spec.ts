/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { OAuthFindAccessTokenHandler } from './o-auth-find-access-token.handler';

// sources
import { accessTokens } from '../../../../@apps/o-auth/access-token/infrastructure/seeds/access-token.seed';

describe('OAuthFindAccessTokenHandler', () =>
{
    let handler: OAuthFindAccessTokenHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthFindAccessTokenHandler,
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

        handler    = module.get<OAuthFindAccessTokenHandler>(OAuthFindAccessTokenHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthFindAccessTokenHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthFindAccessTokenHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a accessToken', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(accessTokens[0])));
            expect(await handler.main()).toBe(accessTokens[0]);
        });
    });
});
/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthFindScopeHandler } from '@api/o-auth/scope';
import { oAuthMockScopeData } from '@app/o-auth/scope';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindScopeHandler', () =>
{
    let handler: OAuthFindScopeHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthFindScopeHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<OAuthFindScopeHandler>(OAuthFindScopeHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('OAuthFindScopeHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthFindScopeHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a scope', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(oAuthMockScopeData[0])));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(oAuthMockScopeData[0]);
        });
    });
});

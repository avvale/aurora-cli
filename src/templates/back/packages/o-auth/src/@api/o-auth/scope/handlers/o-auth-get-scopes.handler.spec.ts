/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthGetScopesHandler } from '@api/o-auth/scope';
import { oAuthMockScopeData } from '@app/o-auth/scope';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthGetScopesHandler', () =>
{
    let handler: OAuthGetScopesHandler;
    let queryBus: IQueryBus;

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
            ],
        })
            .compile();

        handler = module.get<OAuthGetScopesHandler>(OAuthGetScopesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
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

        test('should return a oAuthMockScopeData', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(oAuthMockScopeData)));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(oAuthMockScopeData);
        });
    });
});

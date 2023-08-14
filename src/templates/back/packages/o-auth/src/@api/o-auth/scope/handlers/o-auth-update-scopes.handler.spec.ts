/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthUpdateScopesInput } from '@api/graphql';
import { OAuthUpdateScopesHandler } from '@api/o-auth/scope';
import { oAuthMockScopeData } from '@app/o-auth/scope';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateScopesHandler', () =>
{
    let handler: OAuthUpdateScopesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateScopesHandler,
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

        handler = module.get<OAuthUpdateScopesHandler>(OAuthUpdateScopesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('OAuthUpdateScopesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateScopesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a scopes updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(oAuthMockScopeData[0])));
            expect(
                await handler.main(
                    <OAuthUpdateScopesInput>oAuthMockScopeData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(oAuthMockScopeData[0]);
        });
    });
});

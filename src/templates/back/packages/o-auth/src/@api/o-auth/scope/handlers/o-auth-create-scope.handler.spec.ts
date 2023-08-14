/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthCreateScopeHandler } from '@api/o-auth/scope';
import { oAuthMockScopeData } from '@app/o-auth/scope';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateScopeHandler', () =>
{
    let handler: OAuthCreateScopeHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthCreateScopeHandler,
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

        handler = module.get<OAuthCreateScopeHandler>(OAuthCreateScopeHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('OAuthCreateScopeHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an scope created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(oAuthMockScopeData[0])));
            expect(
                await handler.main(
                    oAuthMockScopeData[0],
                    'Europe/Madrid',
                ),
            )
                .toBe(oAuthMockScopeData[0]);
        });
    });
});

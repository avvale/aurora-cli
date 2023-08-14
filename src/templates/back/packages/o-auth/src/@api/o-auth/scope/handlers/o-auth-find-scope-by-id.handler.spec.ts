/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthFindScopeByIdHandler } from '@api/o-auth/scope';
import { oAuthMockScopeData } from '@app/o-auth/scope';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindScopeByIdHandler', () =>
{
    let handler: OAuthFindScopeByIdHandler;
    let queryBus: IQueryBus;

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
            ],
        })
            .compile();

        handler = module.get<OAuthFindScopeByIdHandler>(OAuthFindScopeByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
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
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(oAuthMockScopeData[0])));
            expect(
                await handler.main(
                    oAuthMockScopeData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(oAuthMockScopeData[0]);
        });
    });
});

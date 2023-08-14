/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthGetClientsHandler } from '@api/o-auth/client';
import { oAuthMockClientData } from '@app/o-auth/client';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthGetClientsHandler', () =>
{
    let handler: OAuthGetClientsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthGetClientsHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<OAuthGetClientsHandler>(OAuthGetClientsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('OAuthGetClientsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthGetClientsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a oAuthMockClientData', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(oAuthMockClientData)));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(oAuthMockClientData);
        });
    });
});

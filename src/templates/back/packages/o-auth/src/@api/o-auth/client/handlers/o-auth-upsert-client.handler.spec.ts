/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthUpsertClientHandler } from '@api/o-auth/client';
import { oAuthMockClientData } from '@app/o-auth/client';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpsertClientHandler', () =>
{
    let handler: OAuthUpsertClientHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpsertClientHandler,
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

        handler = module.get<OAuthUpsertClientHandler>(OAuthUpsertClientHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('OAuthUpsertClientHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an client upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(oAuthMockClientData[0])));
            expect(
                await handler.main(
                    oAuthMockClientData[0],
                    'Europe/Madrid',
                ))
                .toBe(oAuthMockClientData[0]);
        });
    });
});

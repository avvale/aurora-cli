/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthUpsertApplicationHandler } from '@api/o-auth/application';
import { oAuthMockApplicationData } from '@app/o-auth/application';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpsertApplicationHandler', () =>
{
    let handler: OAuthUpsertApplicationHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpsertApplicationHandler,
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

        handler = module.get<OAuthUpsertApplicationHandler>(OAuthUpsertApplicationHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('OAuthUpsertApplicationHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an application upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(oAuthMockApplicationData[0])));
            expect(
                await handler.main(
                    oAuthMockApplicationData[0],
                    'Europe/Madrid',
                ))
                .toBe(oAuthMockApplicationData[0]);
        });
    });
});

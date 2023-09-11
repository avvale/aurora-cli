/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthFindApplicationClientHandler } from '@api/o-auth/application-client';
import { oAuthMockApplicationClientData } from '@app/o-auth/application-client';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindApplicationClientHandler', () =>
{
    let handler: OAuthFindApplicationClientHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthFindApplicationClientHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<OAuthFindApplicationClientHandler>(OAuthFindApplicationClientHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('OAuthFindApplicationClientHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthFindApplicationClientHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a applicationClient', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(oAuthMockApplicationClientData[0])));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(oAuthMockApplicationClientData[0]);
        });
    });
});

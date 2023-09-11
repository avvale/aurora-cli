/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthFindApplicationClientByIdHandler } from '@api/o-auth/application-client';
import { oAuthMockApplicationClientData } from '@app/o-auth/application-client';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindApplicationClientByIdHandler', () =>
{
    let handler: OAuthFindApplicationClientByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthFindApplicationClientByIdHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<OAuthFindApplicationClientByIdHandler>(OAuthFindApplicationClientByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('OAuthFindApplicationClientByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthFindApplicationClientByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an applicationClient by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(oAuthMockApplicationClientData[0])));
            expect(
                await handler.main(
                    oAuthMockApplicationClientData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(oAuthMockApplicationClientData[0]);
        });
    });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthDeleteApplicationByIdHandler } from '@api/o-auth/application';
import { oAuthMockApplicationData } from '@app/o-auth/application';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteApplicationByIdController', () =>
{
    let handler: OAuthDeleteApplicationByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthDeleteApplicationByIdHandler,
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

        handler = module.get<OAuthDeleteApplicationByIdHandler>(OAuthDeleteApplicationByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('OAuthDeleteApplicationByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an application deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(oAuthMockApplicationData[0])));
            expect(
                await handler.main(
                    oAuthMockApplicationData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(oAuthMockApplicationData[0]);
        });
    });
});

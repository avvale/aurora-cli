/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthUpdateApplicationClientByIdInput } from '@api/graphql';
import { OAuthUpdateApplicationClientByIdHandler } from '@api/o-auth/application-client';
import { oAuthMockApplicationClientData } from '@app/o-auth/application-client';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateApplicationClientByIdHandler', () =>
{
    let handler: OAuthUpdateApplicationClientByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateApplicationClientByIdHandler,
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

        handler = module.get<OAuthUpdateApplicationClientByIdHandler>(OAuthUpdateApplicationClientByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('OAuthUpdateApplicationClientByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateApplicationClientByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a applicationClient updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(oAuthMockApplicationClientData[0])));
            expect(
                await handler.main(
                    <OAuthUpdateApplicationClientByIdInput>oAuthMockApplicationClientData[0],
                    {},
                    'Europe/Madrid',
                ))
                .toBe(oAuthMockApplicationClientData[0]);
        });
    });
});

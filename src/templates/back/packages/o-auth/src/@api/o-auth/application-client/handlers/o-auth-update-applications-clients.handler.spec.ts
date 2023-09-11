/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthUpdateApplicationsClientsInput } from '@api/graphql';
import { OAuthUpdateApplicationsClientsHandler } from '@api/o-auth/application-client';
import { oAuthMockApplicationClientData } from '@app/o-auth/application-client';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateApplicationsClientsHandler', () =>
{
    let handler: OAuthUpdateApplicationsClientsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateApplicationsClientsHandler,
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

        handler = module.get<OAuthUpdateApplicationsClientsHandler>(OAuthUpdateApplicationsClientsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('OAuthUpdateApplicationsClientsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateApplicationsClientsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a applicationsClients updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(oAuthMockApplicationClientData[0])));
            expect(
                await handler.main(
                    <OAuthUpdateApplicationsClientsInput>oAuthMockApplicationClientData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(oAuthMockApplicationClientData[0]);
        });
    });
});

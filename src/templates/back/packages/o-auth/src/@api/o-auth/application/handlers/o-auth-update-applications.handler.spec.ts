/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthUpdateApplicationsInput } from '@api/graphql';
import { OAuthUpdateApplicationsHandler } from '@api/o-auth/application';
import { oAuthMockApplicationData } from '@app/o-auth/application';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateApplicationsHandler', () =>
{
    let handler: OAuthUpdateApplicationsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateApplicationsHandler,
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

        handler = module.get<OAuthUpdateApplicationsHandler>(OAuthUpdateApplicationsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('OAuthUpdateApplicationsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateApplicationsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a applications updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(oAuthMockApplicationData[0])));
            expect(
                await handler.main(
                    <OAuthUpdateApplicationsInput>oAuthMockApplicationData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(oAuthMockApplicationData[0]);
        });
    });
});

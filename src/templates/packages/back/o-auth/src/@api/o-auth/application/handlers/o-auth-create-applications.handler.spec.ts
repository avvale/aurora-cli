import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { OAuthCreateApplicationsHandler } from './o-auth-create-applications.handler';
import { applications } from '@apps/o-auth/application/infrastructure/seeds/application.seed';

describe('OAuthCreateApplicationsHandler', () =>
{
    let handler: OAuthCreateApplicationsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthCreateApplicationsHandler,
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

        handler     = module.get<OAuthCreateApplicationsHandler>(OAuthCreateApplicationsHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('OAuthCreateApplicationsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an applications created', async () =>
        {
            expect(await handler.main(applications)).toBe(true);
        });
    });
});
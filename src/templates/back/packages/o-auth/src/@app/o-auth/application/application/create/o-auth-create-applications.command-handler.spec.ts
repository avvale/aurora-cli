/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { oAuthMockApplicationData } from '@app/o-auth/application/infrastructure/mock/o-auth-mock-application.data';
import { OAuthCreateApplicationsCommandHandler } from './o-auth-create-applications.command-handler';
import { OAuthCreateApplicationsCommand } from './o-auth-create-applications.command';
import { OAuthCreateApplicationsService } from './o-auth-create-applications.service';

describe('oAuthCreateApplicationsCommandHandler', () =>
{
    let commandHandler: OAuthCreateApplicationsCommandHandler;
    let service: OAuthCreateApplicationsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthCreateApplicationsCommandHandler,
                {
                    provide : OAuthCreateApplicationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<OAuthCreateApplicationsCommandHandler>(OAuthCreateApplicationsCommandHandler);
        service = module.get<OAuthCreateApplicationsService>(OAuthCreateApplicationsService);
    });

    describe('main', () =>
    {
        test('OAuthCreateApplicationsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return OAuthMockApplicationData createds', async () =>
        {
            expect(await commandHandler.execute(
                new OAuthCreateApplicationsCommand(
                    oAuthMockApplicationData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});

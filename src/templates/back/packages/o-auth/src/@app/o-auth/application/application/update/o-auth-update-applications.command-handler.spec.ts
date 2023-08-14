import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { oAuthMockApplicationData } from '@app/o-auth/application/infrastructure/mock/o-auth-mock-application.data';
import { OAuthUpdateApplicationsCommandHandler } from './o-auth-update-applications.command-handler';
import { OAuthUpdateApplicationsCommand } from './o-auth-update-applications.command';
import { OAuthUpdateApplicationsService } from './o-auth-update-applications.service';

describe('OAuthUpdateApplicationsCommandHandler', () =>
{
    let commandHandler: OAuthUpdateApplicationsCommandHandler;
    let service: OAuthUpdateApplicationsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthUpdateApplicationsCommandHandler,
                {
                    provide : OAuthUpdateApplicationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<OAuthUpdateApplicationsCommandHandler>(OAuthUpdateApplicationsCommandHandler);
        service = module.get<OAuthUpdateApplicationsService>(OAuthUpdateApplicationsService);
    });

    describe('main', () =>
    {
        test('UpdateApplicationsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an applications updated', async () =>
        {
            expect(await commandHandler.execute(
                new OAuthUpdateApplicationsCommand(
                    {
                        id: oAuthMockApplicationData[0].id,
                        code: oAuthMockApplicationData[0].code,
                        name: oAuthMockApplicationData[0].name,
                        secret: oAuthMockApplicationData[0].secret,
                        isMaster: oAuthMockApplicationData[0].isMaster,
                        clientIds: oAuthMockApplicationData[0].clientIds,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});

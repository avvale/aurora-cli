import { oAuthMockApplicationData, OAuthUpdateApplicationsCommand } from '@app/o-auth/application';
import { OAuthUpdateApplicationsCommandHandler } from '@app/o-auth/application/application/update/o-auth-update-applications.command-handler';
import { OAuthUpdateApplicationsService } from '@app/o-auth/application/application/update/o-auth-update-applications.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateApplicationsCommandHandler', () =>
{
    let commandHandler: OAuthUpdateApplicationsCommandHandler;

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

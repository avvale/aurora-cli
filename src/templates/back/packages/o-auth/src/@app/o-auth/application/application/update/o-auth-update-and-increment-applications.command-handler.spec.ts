import { oAuthMockApplicationData, OAuthUpdateAndIncrementApplicationsCommand } from '@app/o-auth/application';
import { OAuthUpdateAndIncrementApplicationsCommandHandler } from '@app/o-auth/application/application/update/o-auth-update-and-increment-applications.command-handler';
import { OAuthUpdateAndIncrementApplicationsService } from '@app/o-auth/application/application/update/o-auth-update-and-increment-applications.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateAndIncrementApplicationsCommandHandler', () =>
{
    let commandHandler: OAuthUpdateAndIncrementApplicationsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthUpdateAndIncrementApplicationsCommandHandler,
                {
                    provide : OAuthUpdateAndIncrementApplicationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<OAuthUpdateAndIncrementApplicationsCommandHandler>(OAuthUpdateAndIncrementApplicationsCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementApplicationsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an applications updated', async () =>
        {
            /* eslint-disable key-spacing */
            expect(await commandHandler.execute(
                new OAuthUpdateAndIncrementApplicationsCommand(
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
            /* eslint-enable key-spacing */
        });
    });
});

import { OAuthCreateApplicationsCommand, oAuthMockApplicationData } from '@app/o-auth/application';
import { OAuthCreateApplicationsCommandHandler } from '@app/o-auth/application/application/create/o-auth-create-applications.command-handler';
import { OAuthCreateApplicationsService } from '@app/o-auth/application/application/create/o-auth-create-applications.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('oAuthCreateApplicationsCommandHandler', () =>
{
    let commandHandler: OAuthCreateApplicationsCommandHandler;

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
    });

    describe('main', () =>
    {
        test('OAuthCreateApplicationsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return OAuthMockApplicationData created', async () =>
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

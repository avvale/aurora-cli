import { OAuthCreateApplicationCommandHandler } from './o-auth-create-application.command-handler';
import { OAuthCreateApplicationService } from './o-auth-create-application.service';
import { OAuthCreateApplicationCommand, oAuthMockApplicationData } from '@app/o-auth/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateApplicationCommandHandler', () =>
{
    let commandHandler: OAuthCreateApplicationCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthCreateApplicationCommandHandler,
                {
                    provide : OAuthCreateApplicationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<OAuthCreateApplicationCommandHandler>(OAuthCreateApplicationCommandHandler);
    });

    describe('main', () =>
    {
        test('CreateApplicationCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the OAuthCreateApplicationService', async () =>
        {
            expect(await commandHandler.execute(
                new OAuthCreateApplicationCommand(
                    {
                        id: oAuthMockApplicationData[0].id,
                        code: oAuthMockApplicationData[0].code,
                        name: oAuthMockApplicationData[0].name,
                        secret: oAuthMockApplicationData[0].secret,
                        isMaster: oAuthMockApplicationData[0].isMaster,
                        clientIds: oAuthMockApplicationData[0].clientIds,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});

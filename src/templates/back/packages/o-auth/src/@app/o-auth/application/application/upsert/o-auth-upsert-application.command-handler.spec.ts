import { oAuthMockApplicationData, OAuthUpsertApplicationCommand } from '@app/o-auth/application';
import { OAuthUpsertApplicationCommandHandler } from '@app/o-auth/application/application/upsert/o-auth-upsert-application.command-handler';
import { OAuthUpsertApplicationService } from '@app/o-auth/application/application/upsert/o-auth-upsert-application.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpsertApplicationCommandHandler', () =>
{
    let commandHandler: OAuthUpsertApplicationCommandHandler;
    let service: OAuthUpsertApplicationService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthUpsertApplicationCommandHandler,
                {
                    provide : OAuthUpsertApplicationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<OAuthUpsertApplicationCommandHandler>(OAuthUpsertApplicationCommandHandler);
        service = module.get<OAuthUpsertApplicationService>(OAuthUpsertApplicationService);
    });

    describe('main', () =>
    {
        test('UpsertApplicationCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the OAuthUpsertApplicationService', async () =>
        {
            expect(await commandHandler.execute(
                new OAuthUpsertApplicationCommand(
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

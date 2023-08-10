import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { oAuthMockApplicationData } from '@app/o-auth/application/infrastructure/mock/o-auth-mock-application.data';
import { OAuthUpdateApplicationByIdCommandHandler } from './o-auth-update-application-by-id.command-handler';
import { OAuthUpdateApplicationByIdCommand } from './o-auth-update-application-by-id.command';
import { OAuthUpdateApplicationByIdService } from './o-auth-update-application-by-id.service';

describe('OAuthUpdateApplicationByIdCommandHandler', () =>
{
    let commandHandler: OAuthUpdateApplicationByIdCommandHandler;
    let service: OAuthUpdateApplicationByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthUpdateApplicationByIdCommandHandler,
                {
                    provide : OAuthUpdateApplicationByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<OAuthUpdateApplicationByIdCommandHandler>(OAuthUpdateApplicationByIdCommandHandler);
        service = module.get<OAuthUpdateApplicationByIdService>(OAuthUpdateApplicationByIdService);
    });

    describe('main', () =>
    {
        test('UpdateApplicationByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an application created', async () =>
        {
            expect(await commandHandler.execute(
                new OAuthUpdateApplicationByIdCommand(
                    {
                        id: oAuthMockApplicationData[0].id,
                        code: oAuthMockApplicationData[0].code,
                        name: oAuthMockApplicationData[0].name,
                        secret: oAuthMockApplicationData[0].secret,
                        isMaster: oAuthMockApplicationData[0].isMaster,
                        clientIds: oAuthMockApplicationData[0].clientIds,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});

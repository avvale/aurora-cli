import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteApplicationByIdCommandHandler } from './o-auth-delete-application-by-id.command-handler';
import { oAuthMockApplicationData } from '@app/o-auth/application/infrastructure/mock/o-auth-mock-application.data';
import { OAuthDeleteApplicationByIdCommand } from './o-auth-delete-application-by-id.command';
import { OAuthDeleteApplicationByIdService } from './o-auth-delete-application-by-id.service';

describe('OAuthDeleteApplicationByIdCommandHandler', () =>
{
    let commandHandler: OAuthDeleteApplicationByIdCommandHandler;
    let service: OAuthDeleteApplicationByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthDeleteApplicationByIdCommandHandler,
                {
                    provide : OAuthDeleteApplicationByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<OAuthDeleteApplicationByIdCommandHandler>(OAuthDeleteApplicationByIdCommandHandler);
        service = module.get<OAuthDeleteApplicationByIdService>(OAuthDeleteApplicationByIdService);
    });

    describe('main', () =>
    {
        test('OAuthDeleteApplicationByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the OAuthDeleteApplicationByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new OAuthDeleteApplicationByIdCommand(
                    oAuthMockApplicationData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});

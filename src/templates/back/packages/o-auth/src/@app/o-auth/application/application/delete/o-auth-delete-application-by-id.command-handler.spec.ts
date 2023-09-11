import { OAuthDeleteApplicationByIdCommand, oAuthMockApplicationData } from '@app/o-auth/application';
import { OAuthDeleteApplicationByIdCommandHandler } from '@app/o-auth/application/application/delete/o-auth-delete-application-by-id.command-handler';
import { OAuthDeleteApplicationByIdService } from '@app/o-auth/application/application/delete/o-auth-delete-application-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteApplicationByIdCommandHandler', () =>
{
    let commandHandler: OAuthDeleteApplicationByIdCommandHandler;

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

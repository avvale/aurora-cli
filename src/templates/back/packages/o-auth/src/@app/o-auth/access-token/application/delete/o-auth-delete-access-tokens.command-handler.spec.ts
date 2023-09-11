import { OAuthDeleteAccessTokensCommand } from '@app/o-auth/access-token';
import { OAuthDeleteAccessTokensCommandHandler } from '@app/o-auth/access-token/application/delete/o-auth-delete-access-tokens.command-handler';
import { OAuthDeleteAccessTokensService } from '@app/o-auth/access-token/application/delete/o-auth-delete-access-tokens.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteAccessTokensCommandHandler', () =>
{
    let commandHandler: OAuthDeleteAccessTokensCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthDeleteAccessTokensCommandHandler,
                {
                    provide : OAuthDeleteAccessTokensService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<OAuthDeleteAccessTokensCommandHandler>(OAuthDeleteAccessTokensCommandHandler);
    });

    describe('main', () =>
    {
        test('OAuthDeleteAccessTokensCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new OAuthDeleteAccessTokensCommand(),
            )).toBe(undefined);
        });
    });
});

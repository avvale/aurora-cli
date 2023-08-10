import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteAccessTokensCommandHandler } from './o-auth-delete-access-tokens.command-handler';
import { OAuthDeleteAccessTokensCommand } from './o-auth-delete-access-tokens.command';
import { OAuthDeleteAccessTokensService } from './o-auth-delete-access-tokens.service';

describe('OAuthDeleteAccessTokensCommandHandler', () =>
{
    let commandHandler: OAuthDeleteAccessTokensCommandHandler;
    let service: OAuthDeleteAccessTokensService;

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
        service = module.get<OAuthDeleteAccessTokensService>(OAuthDeleteAccessTokensService);
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

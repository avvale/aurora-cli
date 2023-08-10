import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteRefreshTokensCommandHandler } from './o-auth-delete-refresh-tokens.command-handler';
import { OAuthDeleteRefreshTokensCommand } from './o-auth-delete-refresh-tokens.command';
import { OAuthDeleteRefreshTokensService } from './o-auth-delete-refresh-tokens.service';

describe('OAuthDeleteRefreshTokensCommandHandler', () =>
{
    let commandHandler: OAuthDeleteRefreshTokensCommandHandler;
    let service: OAuthDeleteRefreshTokensService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthDeleteRefreshTokensCommandHandler,
                {
                    provide : OAuthDeleteRefreshTokensService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<OAuthDeleteRefreshTokensCommandHandler>(OAuthDeleteRefreshTokensCommandHandler);
        service = module.get<OAuthDeleteRefreshTokensService>(OAuthDeleteRefreshTokensService);
    });

    describe('main', () =>
    {
        test('OAuthDeleteRefreshTokensCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new OAuthDeleteRefreshTokensCommand(),
            )).toBe(undefined);
        });
    });
});

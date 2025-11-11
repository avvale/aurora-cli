import { OAuthDeleteRefreshTokensCommand } from '@app/o-auth/refresh-token';
import { OAuthDeleteRefreshTokensCommandHandler } from '@app/o-auth/refresh-token/application/delete/o-auth-delete-refresh-tokens.command-handler';
import { OAuthDeleteRefreshTokensService } from '@app/o-auth/refresh-token/application/delete/o-auth-delete-refresh-tokens.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteRefreshTokensCommandHandler', () => {
    let commandHandler: OAuthDeleteRefreshTokensCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthDeleteRefreshTokensCommandHandler,
                {
                    provide: OAuthDeleteRefreshTokensService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<OAuthDeleteRefreshTokensCommandHandler>(
            OAuthDeleteRefreshTokensCommandHandler,
        );
    });

    describe('main', () => {
        test('OAuthDeleteRefreshTokensCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () => {
            expect(
                await commandHandler.execute(
                    new OAuthDeleteRefreshTokensCommand(),
                ),
            ).toBe(undefined);
        });
    });
});

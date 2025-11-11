import {
    OAuthDeleteRefreshTokenByIdCommand,
    oAuthMockRefreshTokenData,
} from '@app/o-auth/refresh-token';
import { OAuthDeleteRefreshTokenByIdCommandHandler } from '@app/o-auth/refresh-token/application/delete/o-auth-delete-refresh-token-by-id.command-handler';
import { OAuthDeleteRefreshTokenByIdService } from '@app/o-auth/refresh-token/application/delete/o-auth-delete-refresh-token-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteRefreshTokenByIdCommandHandler', () => {
    let commandHandler: OAuthDeleteRefreshTokenByIdCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthDeleteRefreshTokenByIdCommandHandler,
                {
                    provide: OAuthDeleteRefreshTokenByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<OAuthDeleteRefreshTokenByIdCommandHandler>(
            OAuthDeleteRefreshTokenByIdCommandHandler,
        );
    });

    describe('main', () => {
        test('OAuthDeleteRefreshTokenByIdCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the OAuthDeleteRefreshTokenByIdService', async () => {
            expect(
                await commandHandler.execute(
                    new OAuthDeleteRefreshTokenByIdCommand(
                        oAuthMockRefreshTokenData[0].id,
                    ),
                ),
            ).toBe(undefined);
        });
    });
});

import {
    OAuthDeleteAccessTokenByIdCommand,
    oAuthMockAccessTokenData,
} from '@app/o-auth/access-token';
import { OAuthDeleteAccessTokenByIdCommandHandler } from '@app/o-auth/access-token/application/delete/o-auth-delete-access-token-by-id.command-handler';
import { OAuthDeleteAccessTokenByIdService } from '@app/o-auth/access-token/application/delete/o-auth-delete-access-token-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteAccessTokenByIdCommandHandler', () => {
    let commandHandler: OAuthDeleteAccessTokenByIdCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthDeleteAccessTokenByIdCommandHandler,
                {
                    provide: OAuthDeleteAccessTokenByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<OAuthDeleteAccessTokenByIdCommandHandler>(
            OAuthDeleteAccessTokenByIdCommandHandler,
        );
    });

    describe('main', () => {
        test('OAuthDeleteAccessTokenByIdCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the OAuthDeleteAccessTokenByIdService', async () => {
            expect(
                await commandHandler.execute(
                    new OAuthDeleteAccessTokenByIdCommand(
                        oAuthMockAccessTokenData[0].id,
                    ),
                ),
            ).toBe(undefined);
        });
    });
});

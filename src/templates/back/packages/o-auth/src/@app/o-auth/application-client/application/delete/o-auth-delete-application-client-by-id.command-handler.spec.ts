import {
    OAuthDeleteApplicationClientByIdCommand,
    oAuthMockApplicationClientData,
} from '@app/o-auth/application-client';
import { OAuthDeleteApplicationClientByIdCommandHandler } from '@app/o-auth/application-client/application/delete/o-auth-delete-application-client-by-id.command-handler';
import { OAuthDeleteApplicationClientByIdService } from '@app/o-auth/application-client/application/delete/o-auth-delete-application-client-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteApplicationClientByIdCommandHandler', () => {
    let commandHandler: OAuthDeleteApplicationClientByIdCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthDeleteApplicationClientByIdCommandHandler,
                {
                    provide: OAuthDeleteApplicationClientByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler =
            module.get<OAuthDeleteApplicationClientByIdCommandHandler>(
                OAuthDeleteApplicationClientByIdCommandHandler,
            );
    });

    describe('main', () => {
        test('OAuthDeleteApplicationClientByIdCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the OAuthDeleteApplicationClientByIdService', async () => {
            expect(
                await commandHandler.execute(
                    new OAuthDeleteApplicationClientByIdCommand(
                        oAuthMockApplicationClientData[0].id,
                    ),
                ),
            ).toBe(undefined);
        });
    });
});

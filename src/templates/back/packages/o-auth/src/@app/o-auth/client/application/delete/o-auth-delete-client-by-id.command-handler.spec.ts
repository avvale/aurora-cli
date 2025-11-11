import {
    OAuthDeleteClientByIdCommand,
    oAuthMockClientData,
} from '@app/o-auth/client';
import { OAuthDeleteClientByIdCommandHandler } from '@app/o-auth/client/application/delete/o-auth-delete-client-by-id.command-handler';
import { OAuthDeleteClientByIdService } from '@app/o-auth/client/application/delete/o-auth-delete-client-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteClientByIdCommandHandler', () => {
    let commandHandler: OAuthDeleteClientByIdCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthDeleteClientByIdCommandHandler,
                {
                    provide: OAuthDeleteClientByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<OAuthDeleteClientByIdCommandHandler>(
            OAuthDeleteClientByIdCommandHandler,
        );
    });

    describe('main', () => {
        test('OAuthDeleteClientByIdCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the OAuthDeleteClientByIdService', async () => {
            expect(
                await commandHandler.execute(
                    new OAuthDeleteClientByIdCommand(oAuthMockClientData[0].id),
                ),
            ).toBe(undefined);
        });
    });
});

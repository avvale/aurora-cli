import { OAuthDeleteClientsCommand } from '@app/o-auth/client';
import { OAuthDeleteClientsCommandHandler } from '@app/o-auth/client/application/delete/o-auth-delete-clients.command-handler';
import { OAuthDeleteClientsService } from '@app/o-auth/client/application/delete/o-auth-delete-clients.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteClientsCommandHandler', () => {
    let commandHandler: OAuthDeleteClientsCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthDeleteClientsCommandHandler,
                {
                    provide: OAuthDeleteClientsService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<OAuthDeleteClientsCommandHandler>(
            OAuthDeleteClientsCommandHandler,
        );
    });

    describe('main', () => {
        test('OAuthDeleteClientsCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () => {
            expect(
                await commandHandler.execute(new OAuthDeleteClientsCommand()),
            ).toBe(undefined);
        });
    });
});

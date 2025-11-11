import { OAuthDeleteApplicationsCommand } from '@app/o-auth/application';
import { OAuthDeleteApplicationsCommandHandler } from '@app/o-auth/application/application/delete/o-auth-delete-applications.command-handler';
import { OAuthDeleteApplicationsService } from '@app/o-auth/application/application/delete/o-auth-delete-applications.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteApplicationsCommandHandler', () => {
    let commandHandler: OAuthDeleteApplicationsCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthDeleteApplicationsCommandHandler,
                {
                    provide: OAuthDeleteApplicationsService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<OAuthDeleteApplicationsCommandHandler>(
            OAuthDeleteApplicationsCommandHandler,
        );
    });

    describe('main', () => {
        test('OAuthDeleteApplicationsCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () => {
            expect(
                await commandHandler.execute(
                    new OAuthDeleteApplicationsCommand(),
                ),
            ).toBe(undefined);
        });
    });
});

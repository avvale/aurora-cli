import { OAuthDeleteScopesCommand } from '@app/o-auth/scope';
import { OAuthDeleteScopesCommandHandler } from '@app/o-auth/scope/application/delete/o-auth-delete-scopes.command-handler';
import { OAuthDeleteScopesService } from '@app/o-auth/scope/application/delete/o-auth-delete-scopes.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteScopesCommandHandler', () => {
    let commandHandler: OAuthDeleteScopesCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthDeleteScopesCommandHandler,
                {
                    provide: OAuthDeleteScopesService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<OAuthDeleteScopesCommandHandler>(
            OAuthDeleteScopesCommandHandler,
        );
    });

    describe('main', () => {
        test('OAuthDeleteScopesCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () => {
            expect(
                await commandHandler.execute(new OAuthDeleteScopesCommand()),
            ).toBe(undefined);
        });
    });
});

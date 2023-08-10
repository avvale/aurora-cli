import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteScopesCommandHandler } from './o-auth-delete-scopes.command-handler';
import { OAuthDeleteScopesCommand } from './o-auth-delete-scopes.command';
import { OAuthDeleteScopesService } from './o-auth-delete-scopes.service';

describe('OAuthDeleteScopesCommandHandler', () =>
{
    let commandHandler: OAuthDeleteScopesCommandHandler;
    let service: OAuthDeleteScopesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthDeleteScopesCommandHandler,
                {
                    provide : OAuthDeleteScopesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<OAuthDeleteScopesCommandHandler>(OAuthDeleteScopesCommandHandler);
        service = module.get<OAuthDeleteScopesService>(OAuthDeleteScopesService);
    });

    describe('main', () =>
    {
        test('OAuthDeleteScopesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new OAuthDeleteScopesCommand(),
            )).toBe(undefined);
        });
    });
});

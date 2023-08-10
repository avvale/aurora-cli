import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteScopeByIdCommandHandler } from './o-auth-delete-scope-by-id.command-handler';
import { oAuthMockScopeData } from '@app/o-auth/scope/infrastructure/mock/o-auth-mock-scope.data';
import { OAuthDeleteScopeByIdCommand } from './o-auth-delete-scope-by-id.command';
import { OAuthDeleteScopeByIdService } from './o-auth-delete-scope-by-id.service';

describe('OAuthDeleteScopeByIdCommandHandler', () =>
{
    let commandHandler: OAuthDeleteScopeByIdCommandHandler;
    let service: OAuthDeleteScopeByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthDeleteScopeByIdCommandHandler,
                {
                    provide : OAuthDeleteScopeByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<OAuthDeleteScopeByIdCommandHandler>(OAuthDeleteScopeByIdCommandHandler);
        service = module.get<OAuthDeleteScopeByIdService>(OAuthDeleteScopeByIdService);
    });

    describe('main', () =>
    {
        test('OAuthDeleteScopeByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the OAuthDeleteScopeByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new OAuthDeleteScopeByIdCommand(
                    oAuthMockScopeData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});

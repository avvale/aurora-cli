import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { oAuthMockScopeData } from '@app/o-auth/scope/infrastructure/mock/o-auth-mock-scope.data';
import { OAuthUpdateScopesCommandHandler } from './o-auth-update-scopes.command-handler';
import { OAuthUpdateScopesCommand } from './o-auth-update-scopes.command';
import { OAuthUpdateScopesService } from './o-auth-update-scopes.service';

describe('OAuthUpdateScopesCommandHandler', () =>
{
    let commandHandler: OAuthUpdateScopesCommandHandler;
    let service: OAuthUpdateScopesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthUpdateScopesCommandHandler,
                {
                    provide : OAuthUpdateScopesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<OAuthUpdateScopesCommandHandler>(OAuthUpdateScopesCommandHandler);
        service = module.get<OAuthUpdateScopesService>(OAuthUpdateScopesService);
    });

    describe('main', () =>
    {
        test('UpdateScopesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an scopes updated', async () =>
        {
            expect(await commandHandler.execute(
                new OAuthUpdateScopesCommand(
                    {
                        id: oAuthMockScopeData[0].id,
                        code: oAuthMockScopeData[0].code,
                        name: oAuthMockScopeData[0].name,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});

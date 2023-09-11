import { OAuthCreateScopesCommand, oAuthMockScopeData } from '@app/o-auth/scope';
import { OAuthCreateScopesCommandHandler } from '@app/o-auth/scope/application/create/o-auth-create-scopes.command-handler';
import { OAuthCreateScopesService } from '@app/o-auth/scope/application/create/o-auth-create-scopes.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('oAuthCreateScopesCommandHandler', () =>
{
    let commandHandler: OAuthCreateScopesCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthCreateScopesCommandHandler,
                {
                    provide : OAuthCreateScopesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<OAuthCreateScopesCommandHandler>(OAuthCreateScopesCommandHandler);
    });

    describe('main', () =>
    {
        test('OAuthCreateScopesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return OAuthMockScopeData created', async () =>
        {
            expect(await commandHandler.execute(
                new OAuthCreateScopesCommand(
                    oAuthMockScopeData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});

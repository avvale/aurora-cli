import { oAuthMockScopeData, OAuthUpdateScopesCommand } from '@app/o-auth/scope';
import { OAuthUpdateScopesCommandHandler } from '@app/o-auth/scope/application/update/o-auth-update-scopes.command-handler';
import { OAuthUpdateScopesService } from '@app/o-auth/scope/application/update/o-auth-update-scopes.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateScopesCommandHandler', () =>
{
    let commandHandler: OAuthUpdateScopesCommandHandler;

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

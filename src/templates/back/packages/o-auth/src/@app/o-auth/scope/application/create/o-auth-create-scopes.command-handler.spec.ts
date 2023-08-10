/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { oAuthMockScopeData } from '@app/o-auth/scope/infrastructure/mock/o-auth-mock-scope.data';
import { OAuthCreateScopesCommandHandler } from './o-auth-create-scopes.command-handler';
import { OAuthCreateScopesCommand } from './o-auth-create-scopes.command';
import { OAuthCreateScopesService } from './o-auth-create-scopes.service';

describe('oAuthCreateScopesCommandHandler', () =>
{
    let commandHandler: OAuthCreateScopesCommandHandler;
    let service: OAuthCreateScopesService;

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
        service = module.get<OAuthCreateScopesService>(OAuthCreateScopesService);
    });

    describe('main', () =>
    {
        test('OAuthCreateScopesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return OAuthMockScopeData createds', async () =>
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

import { oAuthMockScopeData, OAuthUpdateAndIncrementScopesCommand } from '@app/o-auth/scope';
import { OAuthUpdateAndIncrementScopesCommandHandler } from '@app/o-auth/scope/application/update/o-auth-update-and-increment-scopes.command-handler';
import { OAuthUpdateAndIncrementScopesService } from '@app/o-auth/scope/application/update/o-auth-update-and-increment-scopes.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateAndIncrementScopesCommandHandler', () =>
{
    let commandHandler: OAuthUpdateAndIncrementScopesCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthUpdateAndIncrementScopesCommandHandler,
                {
                    provide : OAuthUpdateAndIncrementScopesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<OAuthUpdateAndIncrementScopesCommandHandler>(OAuthUpdateAndIncrementScopesCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementScopesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an scopes updated', async () =>
        {
            /* eslint-disable key-spacing */
            expect(await commandHandler.execute(
                new OAuthUpdateAndIncrementScopesCommand(
                    {
                        id: oAuthMockScopeData[0].id,
                        code: oAuthMockScopeData[0].code,
                        name: oAuthMockScopeData[0].name,
                        roleIds: oAuthMockScopeData[0].roleIds,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
            /* eslint-enable key-spacing */
        });
    });
});

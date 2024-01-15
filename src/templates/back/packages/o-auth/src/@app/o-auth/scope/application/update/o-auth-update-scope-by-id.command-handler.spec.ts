import { oAuthMockScopeData, OAuthUpdateScopeByIdCommand } from '@app/o-auth/scope';
import { OAuthUpdateScopeByIdCommandHandler } from '@app/o-auth/scope/application/update/o-auth-update-scope-by-id.command-handler';
import { OAuthUpdateScopeByIdService } from '@app/o-auth/scope/application/update/o-auth-update-scope-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateScopeByIdCommandHandler', () =>
{
    let commandHandler: OAuthUpdateScopeByIdCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthUpdateScopeByIdCommandHandler,
                {
                    provide : OAuthUpdateScopeByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<OAuthUpdateScopeByIdCommandHandler>(OAuthUpdateScopeByIdCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateScopeByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an scope created', async () =>
        {
            expect(await commandHandler.execute(
                new OAuthUpdateScopeByIdCommand(
                    {
                        id: oAuthMockScopeData[0].id,
                        code: oAuthMockScopeData[0].code,
                        name: oAuthMockScopeData[0].name,
                        roleIds: oAuthMockScopeData[0].roleIds,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});

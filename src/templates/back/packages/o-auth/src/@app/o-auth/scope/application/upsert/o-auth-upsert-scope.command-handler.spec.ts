import { oAuthMockScopeData, OAuthUpsertScopeCommand } from '@app/o-auth/scope';
import { OAuthUpsertScopeCommandHandler } from '@app/o-auth/scope/application/upsert/o-auth-upsert-scope.command-handler';
import { OAuthUpsertScopeService } from '@app/o-auth/scope/application/upsert/o-auth-upsert-scope.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpsertScopeCommandHandler', () =>
{
    let commandHandler: OAuthUpsertScopeCommandHandler;
    let service: OAuthUpsertScopeService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthUpsertScopeCommandHandler,
                {
                    provide : OAuthUpsertScopeService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<OAuthUpsertScopeCommandHandler>(OAuthUpsertScopeCommandHandler);
        service = module.get<OAuthUpsertScopeService>(OAuthUpsertScopeService);
    });

    describe('main', () =>
    {
        test('UpsertScopeCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the OAuthUpsertScopeService', async () =>
        {
            expect(await commandHandler.execute(
                new OAuthUpsertScopeCommand(
                    {
                        id: oAuthMockScopeData[0].id,
                        code: oAuthMockScopeData[0].code,
                        name: oAuthMockScopeData[0].name,
                        roleIds: oAuthMockScopeData[0].roleIds,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});

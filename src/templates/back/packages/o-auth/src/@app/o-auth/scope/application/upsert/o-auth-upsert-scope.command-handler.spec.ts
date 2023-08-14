import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { oAuthMockScopeData } from '@app/o-auth/scope/infrastructure/mock/o-auth-mock-scope.data';
import { OAuthUpsertScopeCommandHandler } from './o-auth-upsert-scope.command-handler';
import { OAuthUpsertScopeCommand } from './o-auth-upsert-scope.command';
import { OAuthUpsertScopeService } from './o-auth-upsert-scope.service';

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
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});

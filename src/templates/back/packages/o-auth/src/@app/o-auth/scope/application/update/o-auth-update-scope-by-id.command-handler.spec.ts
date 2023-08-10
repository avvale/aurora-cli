import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { oAuthMockScopeData } from '@app/o-auth/scope/infrastructure/mock/o-auth-mock-scope.data';
import { OAuthUpdateScopeByIdCommandHandler } from './o-auth-update-scope-by-id.command-handler';
import { OAuthUpdateScopeByIdCommand } from './o-auth-update-scope-by-id.command';
import { OAuthUpdateScopeByIdService } from './o-auth-update-scope-by-id.service';

describe('OAuthUpdateScopeByIdCommandHandler', () =>
{
    let commandHandler: OAuthUpdateScopeByIdCommandHandler;
    let service: OAuthUpdateScopeByIdService;

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
        service = module.get<OAuthUpdateScopeByIdService>(OAuthUpdateScopeByIdService);
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
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});

import { OAuthDeleteScopeByIdCommand, oAuthMockScopeData } from '@app/o-auth/scope';
import { OAuthDeleteScopeByIdCommandHandler } from '@app/o-auth/scope/application/delete/o-auth-delete-scope-by-id.command-handler';
import { OAuthDeleteScopeByIdService } from '@app/o-auth/scope/application/delete/o-auth-delete-scope-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteScopeByIdCommandHandler', () =>
{
    let commandHandler: OAuthDeleteScopeByIdCommandHandler;

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

import { OAuthCreateScopeCommand, oAuthMockScopeData } from '@app/o-auth/scope';
import { Test, TestingModule } from '@nestjs/testing';
import { OAuthCreateScopeCommandHandler } from './o-auth-create-scope.command-handler';
import { OAuthCreateScopeService } from './o-auth-create-scope.service';

describe('OAuthCreateScopeCommandHandler', () => {
    let commandHandler: OAuthCreateScopeCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthCreateScopeCommandHandler,
                {
                    provide: OAuthCreateScopeService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<OAuthCreateScopeCommandHandler>(
            OAuthCreateScopeCommandHandler,
        );
    });

    describe('main', () => {
        test('CreateScopeCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the OAuthCreateScopeService', async () => {
            expect(
                await commandHandler.execute(
                    new OAuthCreateScopeCommand(
                        {
                            id: oAuthMockScopeData[0].id,
                            rowId: oAuthMockScopeData[0].rowId,
                            code: oAuthMockScopeData[0].code,
                            name: oAuthMockScopeData[0].name,
                            roleIds: oAuthMockScopeData[0].roleIds,
                        },
                        { timezone: process.env.TZ },
                    ),
                ),
            ).toBe(undefined);
        });
    });
});

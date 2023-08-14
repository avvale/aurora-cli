import { OAuthCreateScopesHandler } from '@api/o-auth/scope';
import { oAuthMockScopeData } from '@app/o-auth/scope';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateScopesHandler', () =>
{
    let handler: OAuthCreateScopesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthCreateScopesHandler,
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<OAuthCreateScopesHandler>(OAuthCreateScopesHandler);
    });

    describe('main', () =>
    {
        test('OAuthCreateScopesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an oAuthMockScopeData created', async () =>
        {
            expect(await handler.main(oAuthMockScopeData)).toBe(true);
        });
    });
});

import { OAuthCreateScopesController, OAuthCreateScopesHandler } from '@api/o-auth/scope';
import { oAuthMockScopeData } from '@app/o-auth/scope';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateScopesController', () =>
{
    let controller: OAuthCreateScopesController;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                OAuthCreateScopesController,
            ],
            providers: [
                {
                    provide : OAuthCreateScopesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthCreateScopesController>(OAuthCreateScopesController);
    });

    describe('main', () =>
    {
        test('OAuthCreateScopesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an oAuthMockScopeData created', async () =>
        {
            expect(
                await controller.main(
                    oAuthMockScopeData,
                ),
            )
                .toBe(undefined);
        });
    });
});

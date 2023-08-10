import { OAuthUpdateScopesController, OAuthUpdateScopesHandler } from '@api/o-auth/scope';
import { oAuthMockScopeData } from '@app/o-auth/scope';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateScopesController', () =>
{
    let controller: OAuthUpdateScopesController;
    let handler: OAuthUpdateScopesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthUpdateScopesController,
            ],
            providers: [
                {
                    provide : OAuthUpdateScopesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthUpdateScopesController>(OAuthUpdateScopesController);
        handler = module.get<OAuthUpdateScopesHandler>(OAuthUpdateScopesHandler);
    });

    describe('main', () =>
    {
        test('OAuthUpdateScopesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a scopes updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockScopeData[0])));
            expect(await controller.main(oAuthMockScopeData[0])).toBe(oAuthMockScopeData[0]);
        });
    });
});

import { OAuthUpdateScopeByIdController, OAuthUpdateScopeByIdHandler } from '@api/o-auth/scope';
import { oAuthMockScopeData } from '@app/o-auth/scope';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateScopeByIdController', () =>
{
    let controller: OAuthUpdateScopeByIdController;
    let handler: OAuthUpdateScopeByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthUpdateScopeByIdController,
            ],
            providers: [
                {
                    provide : OAuthUpdateScopeByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthUpdateScopeByIdController>(OAuthUpdateScopeByIdController);
        handler = module.get<OAuthUpdateScopeByIdHandler>(OAuthUpdateScopeByIdHandler);
    });

    describe('main', () =>
    {
        test('OAuthUpdateScopeByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a scope updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockScopeData[0])));
            expect(await controller.main(oAuthMockScopeData[0])).toBe(oAuthMockScopeData[0]);
        });
    });
});

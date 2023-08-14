import { OAuthDeleteAccessTokensController, OAuthDeleteAccessTokensHandler } from '@api/o-auth/access-token';
import { oAuthMockAccessTokenData } from '@app/o-auth/access-token';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteAccessTokensController', () =>
{
    let controller: OAuthDeleteAccessTokensController;
    let handler: OAuthDeleteAccessTokensHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthDeleteAccessTokensController,
            ],
            providers: [
                {
                    provide : OAuthDeleteAccessTokensHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthDeleteAccessTokensController>(OAuthDeleteAccessTokensController);
        handler = module.get<OAuthDeleteAccessTokensHandler>(OAuthDeleteAccessTokensHandler);
    });

    describe('main', () =>
    {
        test('OAuthDeleteAccessTokensController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an oAuthMockAccessTokenData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockAccessTokenData)));
            expect(await controller.main()).toBe(oAuthMockAccessTokenData);
        });
    });
});

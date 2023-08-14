import { OAuthFindAccessTokenController, OAuthFindAccessTokenHandler } from '@api/o-auth/access-token';
import { oAuthMockAccessTokenData } from '@app/o-auth/access-token';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindAccessTokenController', () =>
{
    let controller: OAuthFindAccessTokenController;
    let handler: OAuthFindAccessTokenHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthFindAccessTokenController,
            ],
            providers: [
                {
                    provide : OAuthFindAccessTokenHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthFindAccessTokenController>(OAuthFindAccessTokenController);
        handler = module.get<OAuthFindAccessTokenHandler>(OAuthFindAccessTokenHandler);
    });

    describe('main', () =>
    {
        test('OAuthFindAccessTokenController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a accessToken', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockAccessTokenData[0])));
            expect(await controller.main()).toBe(oAuthMockAccessTokenData[0]);
        });
    });
});

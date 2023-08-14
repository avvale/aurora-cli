import { OAuthFindAccessTokenByIdController, OAuthFindAccessTokenByIdHandler } from '@api/o-auth/access-token';
import { oAuthMockAccessTokenData } from '@app/o-auth/access-token';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindAccessTokenByIdController', () =>
{
    let controller: OAuthFindAccessTokenByIdController;
    let handler: OAuthFindAccessTokenByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthFindAccessTokenByIdController,
            ],
            providers: [
                {
                    provide : OAuthFindAccessTokenByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthFindAccessTokenByIdController>(OAuthFindAccessTokenByIdController);
        handler = module.get<OAuthFindAccessTokenByIdHandler>(OAuthFindAccessTokenByIdHandler);
    });

    describe('main', () =>
    {
        test('OAuthFindAccessTokenByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an accessToken by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockAccessTokenData[0])));
            expect(await controller.main(oAuthMockAccessTokenData[0].id)).toBe(oAuthMockAccessTokenData[0]);
        });
    });
});

import { OAuthPaginateRefreshTokensController, OAuthPaginateRefreshTokensHandler } from '@api/o-auth/refresh-token';
import { oAuthMockRefreshTokenData } from '@app/o-auth/refresh-token';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthPaginateRefreshTokensController', () =>
{
    let controller: OAuthPaginateRefreshTokensController;
    let handler: OAuthPaginateRefreshTokensHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthPaginateRefreshTokensController,
            ],
            providers: [
                {
                    provide : OAuthPaginateRefreshTokensHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthPaginateRefreshTokensController>(OAuthPaginateRefreshTokensController);
        handler = module.get<OAuthPaginateRefreshTokensHandler>(OAuthPaginateRefreshTokensHandler);
    });

    describe('main', () =>
    {
        test('OAuthPaginateRefreshTokensController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a oAuthMockRefreshTokenData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : oAuthMockRefreshTokenData,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : oAuthMockRefreshTokenData,
            });
        });
    });
});

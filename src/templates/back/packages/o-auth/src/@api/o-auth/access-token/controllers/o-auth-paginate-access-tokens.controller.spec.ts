import { OAuthPaginateAccessTokensController, OAuthPaginateAccessTokensHandler } from '@api/o-auth/access-token';
import { oAuthMockAccessTokenData } from '@app/o-auth/access-token';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthPaginateAccessTokensController', () =>
{
    let controller: OAuthPaginateAccessTokensController;
    let handler: OAuthPaginateAccessTokensHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthPaginateAccessTokensController,
            ],
            providers: [
                {
                    provide : OAuthPaginateAccessTokensHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthPaginateAccessTokensController>(OAuthPaginateAccessTokensController);
        handler = module.get<OAuthPaginateAccessTokensHandler>(OAuthPaginateAccessTokensHandler);
    });

    describe('main', () =>
    {
        test('OAuthPaginateAccessTokensController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a oAuthMockAccessTokenData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : oAuthMockAccessTokenData,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : oAuthMockAccessTokenData,
            });
        });
    });
});

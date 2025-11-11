import {
    OAuthGetRefreshTokensController,
    OAuthGetRefreshTokensHandler,
} from '@api/o-auth/refresh-token';
import { oAuthMockRefreshTokenData } from '@app/o-auth/refresh-token';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthGetRefreshTokensController', () => {
    let controller: OAuthGetRefreshTokensController;
    let handler: OAuthGetRefreshTokensHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [OAuthGetRefreshTokensController],
            providers: [
                {
                    provide: OAuthGetRefreshTokensHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<OAuthGetRefreshTokensController>(
            OAuthGetRefreshTokensController,
        );
        handler = module.get<OAuthGetRefreshTokensHandler>(
            OAuthGetRefreshTokensHandler,
        );
    });

    describe('main', () => {
        test('OAuthGetRefreshTokensController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a oAuthMockRefreshTokenData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(oAuthMockRefreshTokenData),
                    ),
            );
            expect(await controller.main()).toBe(oAuthMockRefreshTokenData);
        });
    });
});

import {
  OAuthDeleteRefreshTokensController,
  OAuthDeleteRefreshTokensHandler,
} from '@api/o-auth/refresh-token';
import { oAuthMockRefreshTokenData } from '@app/o-auth/refresh-token';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteRefreshTokensController', () => {
  let controller: OAuthDeleteRefreshTokensController;
  let handler: OAuthDeleteRefreshTokensHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [OAuthDeleteRefreshTokensController],
      providers: [
        {
          provide: OAuthDeleteRefreshTokensHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<OAuthDeleteRefreshTokensController>(
      OAuthDeleteRefreshTokensController,
    );
    handler = module.get<OAuthDeleteRefreshTokensHandler>(
      OAuthDeleteRefreshTokensHandler,
    );
  });

  describe('main', () => {
    test('OAuthDeleteRefreshTokensController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an oAuthMockRefreshTokenData deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(oAuthMockRefreshTokenData)),
        );
      expect(await controller.main()).toBe(oAuthMockRefreshTokenData);
    });
  });
});

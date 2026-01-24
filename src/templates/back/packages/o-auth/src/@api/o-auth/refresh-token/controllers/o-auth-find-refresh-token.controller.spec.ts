import {
  OAuthFindRefreshTokenController,
  OAuthFindRefreshTokenHandler,
} from '@api/o-auth/refresh-token';
import { oAuthMockRefreshTokenData } from '@app/o-auth/refresh-token';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindRefreshTokenController', () => {
  let controller: OAuthFindRefreshTokenController;
  let handler: OAuthFindRefreshTokenHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [OAuthFindRefreshTokenController],
      providers: [
        {
          provide: OAuthFindRefreshTokenHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<OAuthFindRefreshTokenController>(
      OAuthFindRefreshTokenController,
    );
    handler = module.get<OAuthFindRefreshTokenHandler>(
      OAuthFindRefreshTokenHandler,
    );
  });

  describe('main', () => {
    test('OAuthFindRefreshTokenController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a refreshToken', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(oAuthMockRefreshTokenData[0])),
        );
      expect(await controller.main()).toBe(oAuthMockRefreshTokenData[0]);
    });
  });
});

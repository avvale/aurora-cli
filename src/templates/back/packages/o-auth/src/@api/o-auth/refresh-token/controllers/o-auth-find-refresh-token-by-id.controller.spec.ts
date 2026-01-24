import {
  OAuthFindRefreshTokenByIdController,
  OAuthFindRefreshTokenByIdHandler,
} from '@api/o-auth/refresh-token';
import { oAuthMockRefreshTokenData } from '@app/o-auth/refresh-token';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindRefreshTokenByIdController', () => {
  let controller: OAuthFindRefreshTokenByIdController;
  let handler: OAuthFindRefreshTokenByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [OAuthFindRefreshTokenByIdController],
      providers: [
        {
          provide: OAuthFindRefreshTokenByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<OAuthFindRefreshTokenByIdController>(
      OAuthFindRefreshTokenByIdController,
    );
    handler = module.get<OAuthFindRefreshTokenByIdHandler>(
      OAuthFindRefreshTokenByIdHandler,
    );
  });

  describe('main', () => {
    test('OAuthFindRefreshTokenByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an refreshToken by id', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(oAuthMockRefreshTokenData[0])),
        );
      expect(await controller.main(oAuthMockRefreshTokenData[0].id)).toBe(
        oAuthMockRefreshTokenData[0],
      );
    });
  });
});

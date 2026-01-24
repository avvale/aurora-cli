/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  OAuthDeleteRefreshTokenByIdController,
  OAuthDeleteRefreshTokenByIdHandler,
} from '@api/o-auth/refresh-token';
import { oAuthMockRefreshTokenData } from '@app/o-auth/refresh-token';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteRefreshTokenByIdController', () => {
  let controller: OAuthDeleteRefreshTokenByIdController;
  let handler: OAuthDeleteRefreshTokenByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [OAuthDeleteRefreshTokenByIdController],
      providers: [
        {
          provide: OAuthDeleteRefreshTokenByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<OAuthDeleteRefreshTokenByIdController>(
      OAuthDeleteRefreshTokenByIdController,
    );
    handler = module.get<OAuthDeleteRefreshTokenByIdHandler>(
      OAuthDeleteRefreshTokenByIdHandler,
    );
  });

  describe('main', () => {
    test('OAuthDeleteRefreshTokenByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an refreshToken deleted', async () => {
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

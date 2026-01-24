/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  OAuthDeleteAccessTokenByIdController,
  OAuthDeleteAccessTokenByIdHandler,
} from '@api/o-auth/access-token';
import { oAuthMockAccessTokenData } from '@app/o-auth/access-token';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteAccessTokenByIdController', () => {
  let controller: OAuthDeleteAccessTokenByIdController;
  let handler: OAuthDeleteAccessTokenByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [OAuthDeleteAccessTokenByIdController],
      providers: [
        {
          provide: OAuthDeleteAccessTokenByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<OAuthDeleteAccessTokenByIdController>(
      OAuthDeleteAccessTokenByIdController,
    );
    handler = module.get<OAuthDeleteAccessTokenByIdHandler>(
      OAuthDeleteAccessTokenByIdHandler,
    );
  });

  describe('main', () => {
    test('OAuthDeleteAccessTokenByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an accessToken deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(oAuthMockAccessTokenData[0])),
        );
      expect(await controller.main(oAuthMockAccessTokenData[0].id)).toBe(
        oAuthMockAccessTokenData[0],
      );
    });
  });
});

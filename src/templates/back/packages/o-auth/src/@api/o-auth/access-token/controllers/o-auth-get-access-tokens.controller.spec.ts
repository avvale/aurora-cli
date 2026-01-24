import {
  OAuthGetAccessTokensController,
  OAuthGetAccessTokensHandler,
} from '@api/o-auth/access-token';
import { oAuthMockAccessTokenData } from '@app/o-auth/access-token';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthGetAccessTokensController', () => {
  let controller: OAuthGetAccessTokensController;
  let handler: OAuthGetAccessTokensHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [OAuthGetAccessTokensController],
      providers: [
        {
          provide: OAuthGetAccessTokensHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<OAuthGetAccessTokensController>(
      OAuthGetAccessTokensController,
    );
    handler = module.get<OAuthGetAccessTokensHandler>(
      OAuthGetAccessTokensHandler,
    );
  });

  describe('main', () => {
    test('OAuthGetAccessTokensController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a oAuthMockAccessTokenData', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(oAuthMockAccessTokenData)),
        );
      expect(await controller.main()).toBe(oAuthMockAccessTokenData);
    });
  });
});

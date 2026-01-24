import {
  OAuthFindScopeController,
  OAuthFindScopeHandler,
} from '@api/o-auth/scope';
import { oAuthMockScopeData } from '@app/o-auth/scope';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindScopeController', () => {
  let controller: OAuthFindScopeController;
  let handler: OAuthFindScopeHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [OAuthFindScopeController],
      providers: [
        {
          provide: OAuthFindScopeHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<OAuthFindScopeController>(OAuthFindScopeController);
    handler = module.get<OAuthFindScopeHandler>(OAuthFindScopeHandler);
  });

  describe('main', () => {
    test('OAuthFindScopeController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a scope', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(oAuthMockScopeData[0])),
        );
      expect(await controller.main()).toBe(oAuthMockScopeData[0]);
    });
  });
});

import {
  OAuthPaginateScopesController,
  OAuthPaginateScopesHandler,
} from '@api/o-auth/scope';
import { oAuthMockScopeData } from '@app/o-auth/scope';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthPaginateScopesController', () => {
  let controller: OAuthPaginateScopesController;
  let handler: OAuthPaginateScopesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [OAuthPaginateScopesController],
      providers: [
        {
          provide: OAuthPaginateScopesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<OAuthPaginateScopesController>(
      OAuthPaginateScopesController,
    );
    handler = module.get<OAuthPaginateScopesHandler>(
      OAuthPaginateScopesHandler,
    );
  });

  describe('main', () => {
    test('OAuthPaginateScopesController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a oAuthMockScopeData', async () => {
      jest.spyOn(handler, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: 5,
              count: 5,
              rows: oAuthMockScopeData,
            }),
          ),
      );
      expect(await controller.main()).toStrictEqual({
        total: 5,
        count: 5,
        rows: oAuthMockScopeData,
      });
    });
  });
});

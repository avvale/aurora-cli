/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  OAuthDeleteScopeByIdController,
  OAuthDeleteScopeByIdHandler,
} from '@api/o-auth/scope';
import { oAuthMockScopeData } from '@app/o-auth/scope';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteScopeByIdController', () => {
  let controller: OAuthDeleteScopeByIdController;
  let handler: OAuthDeleteScopeByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [OAuthDeleteScopeByIdController],
      providers: [
        {
          provide: OAuthDeleteScopeByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<OAuthDeleteScopeByIdController>(
      OAuthDeleteScopeByIdController,
    );
    handler = module.get<OAuthDeleteScopeByIdHandler>(
      OAuthDeleteScopeByIdHandler,
    );
  });

  describe('main', () => {
    test('OAuthDeleteScopeByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an scope deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(oAuthMockScopeData[0])),
        );
      expect(await controller.main(oAuthMockScopeData[0].id)).toBe(
        oAuthMockScopeData[0],
      );
    });
  });
});

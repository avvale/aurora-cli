/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  OAuthDeleteClientByIdController,
  OAuthDeleteClientByIdHandler,
} from '@api/o-auth/client';
import { oAuthMockClientData } from '@app/o-auth/client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteClientByIdController', () => {
  let controller: OAuthDeleteClientByIdController;
  let handler: OAuthDeleteClientByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [OAuthDeleteClientByIdController],
      providers: [
        {
          provide: OAuthDeleteClientByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<OAuthDeleteClientByIdController>(
      OAuthDeleteClientByIdController,
    );
    handler = module.get<OAuthDeleteClientByIdHandler>(
      OAuthDeleteClientByIdHandler,
    );
  });

  describe('main', () => {
    test('OAuthDeleteClientByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an client deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(oAuthMockClientData[0])),
        );
      expect(await controller.main(oAuthMockClientData[0].id)).toBe(
        oAuthMockClientData[0],
      );
    });
  });
});

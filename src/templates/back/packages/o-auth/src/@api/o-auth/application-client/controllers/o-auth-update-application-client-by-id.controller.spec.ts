import {
  OAuthUpdateApplicationClientByIdController,
  OAuthUpdateApplicationClientByIdHandler,
} from '@api/o-auth/application-client';
import { oAuthMockApplicationClientData } from '@app/o-auth/application-client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateApplicationClientByIdController', () => {
  let controller: OAuthUpdateApplicationClientByIdController;
  let handler: OAuthUpdateApplicationClientByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [OAuthUpdateApplicationClientByIdController],
      providers: [
        {
          provide: OAuthUpdateApplicationClientByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<OAuthUpdateApplicationClientByIdController>(
      OAuthUpdateApplicationClientByIdController,
    );
    handler = module.get<OAuthUpdateApplicationClientByIdHandler>(
      OAuthUpdateApplicationClientByIdHandler,
    );
  });

  describe('main', () => {
    test('OAuthUpdateApplicationClientByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a applicationClient updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(oAuthMockApplicationClientData[0]),
            ),
        );
      expect(await controller.main(oAuthMockApplicationClientData[0])).toBe(
        oAuthMockApplicationClientData[0],
      );
    });
  });
});

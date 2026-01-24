import {
  OAuthCreateApplicationsController,
  OAuthCreateApplicationsHandler,
} from '@api/o-auth/application';
import { oAuthMockApplicationData } from '@app/o-auth/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateApplicationsController', () => {
  let controller: OAuthCreateApplicationsController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OAuthCreateApplicationsController],
      providers: [
        {
          provide: OAuthCreateApplicationsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<OAuthCreateApplicationsController>(
      OAuthCreateApplicationsController,
    );
  });

  describe('main', () => {
    test('OAuthCreateApplicationsController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an oAuthMockApplicationData created', async () => {
      expect(await controller.main(oAuthMockApplicationData)).toBe(undefined);
    });
  });
});

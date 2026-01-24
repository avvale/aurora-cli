import {
  OAuthPaginateApplicationsClientsController,
  OAuthPaginateApplicationsClientsHandler,
} from '@api/o-auth/application-client';
import { oAuthMockApplicationClientData } from '@app/o-auth/application-client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthPaginateApplicationsClientsController', () => {
  let controller: OAuthPaginateApplicationsClientsController;
  let handler: OAuthPaginateApplicationsClientsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [OAuthPaginateApplicationsClientsController],
      providers: [
        {
          provide: OAuthPaginateApplicationsClientsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<OAuthPaginateApplicationsClientsController>(
      OAuthPaginateApplicationsClientsController,
    );
    handler = module.get<OAuthPaginateApplicationsClientsHandler>(
      OAuthPaginateApplicationsClientsHandler,
    );
  });

  describe('main', () => {
    test('OAuthPaginateApplicationsClientsController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a oAuthMockApplicationClientData', async () => {
      jest.spyOn(handler, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: 5,
              count: 5,
              rows: oAuthMockApplicationClientData,
            }),
          ),
      );
      expect(await controller.main()).toStrictEqual({
        total: 5,
        count: 5,
        rows: oAuthMockApplicationClientData,
      });
    });
  });
});

import { OAuthCreateApplicationsClientsHandler } from '@api/o-auth/application-client';
import { oAuthMockApplicationClientData } from '@app/o-auth/application-client';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateApplicationsClientsHandler', () => {
  let handler: OAuthCreateApplicationsClientsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OAuthCreateApplicationsClientsHandler,
        {
          provide: ICommandBus,
          useValue: {
            dispatch: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<OAuthCreateApplicationsClientsHandler>(
      OAuthCreateApplicationsClientsHandler,
    );
  });

  describe('main', () => {
    test('OAuthCreateApplicationsClientsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an oAuthMockApplicationClientData created', async () => {
      expect(await handler.main(oAuthMockApplicationClientData)).toBe(true);
    });
  });
});

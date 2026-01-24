/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthGetApplicationsClientsHandler } from '@api/o-auth/application-client';
import { oAuthMockApplicationClientData } from '@app/o-auth/application-client';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthGetApplicationsClientsHandler', () => {
  let handler: OAuthGetApplicationsClientsHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OAuthGetApplicationsClientsHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<OAuthGetApplicationsClientsHandler>(
      OAuthGetApplicationsClientsHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('OAuthGetApplicationsClientsHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('OAuthGetApplicationsClientsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a oAuthMockApplicationClientData', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(oAuthMockApplicationClientData)),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        oAuthMockApplicationClientData,
      );
    });
  });
});

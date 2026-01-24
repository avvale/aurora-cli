/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthDeleteApplicationsClientsHandler } from '@api/o-auth/application-client';
import { oAuthMockApplicationClientData } from '@app/o-auth/application-client';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteApplicationsClientsHandler', () => {
  let handler: OAuthDeleteApplicationsClientsHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OAuthDeleteApplicationsClientsHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
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

    handler = module.get<OAuthDeleteApplicationsClientsHandler>(
      OAuthDeleteApplicationsClientsHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('OAuthDeleteApplicationsClientsHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('OAuthDeleteApplicationsClientsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an oAuthMockApplicationClientData deleted', async () => {
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

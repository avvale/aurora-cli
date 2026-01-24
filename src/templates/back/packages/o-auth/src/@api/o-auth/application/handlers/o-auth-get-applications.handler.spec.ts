/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthGetApplicationsHandler } from '@api/o-auth/application';
import { oAuthMockApplicationData } from '@app/o-auth/application';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthGetApplicationsHandler', () => {
  let handler: OAuthGetApplicationsHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OAuthGetApplicationsHandler,
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

    handler = module.get<OAuthGetApplicationsHandler>(
      OAuthGetApplicationsHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('OAuthGetApplicationsHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('OAuthGetApplicationsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a oAuthMockApplicationData', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(oAuthMockApplicationData)),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        oAuthMockApplicationData,
      );
    });
  });
});

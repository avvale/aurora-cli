/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthFindClientHandler } from '@api/o-auth/client';
import { oAuthMockClientData } from '@app/o-auth/client';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindClientHandler', () => {
  let handler: OAuthFindClientHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OAuthFindClientHandler,
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

    handler = module.get<OAuthFindClientHandler>(OAuthFindClientHandler);
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('OAuthFindClientHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('OAuthFindClientHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a client', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(oAuthMockClientData[0])),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        oAuthMockClientData[0],
      );
    });
  });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthDeleteRefreshTokensHandler } from '@api/o-auth/refresh-token';
import { oAuthMockRefreshTokenData } from '@app/o-auth/refresh-token';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteRefreshTokensHandler', () => {
  let handler: OAuthDeleteRefreshTokensHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OAuthDeleteRefreshTokensHandler,
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

    handler = module.get<OAuthDeleteRefreshTokensHandler>(
      OAuthDeleteRefreshTokensHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('OAuthDeleteRefreshTokensHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('OAuthDeleteRefreshTokensHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an oAuthMockRefreshTokenData deleted', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(oAuthMockRefreshTokenData)),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        oAuthMockRefreshTokenData,
      );
    });
  });
});

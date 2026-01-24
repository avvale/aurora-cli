/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthGetRefreshTokensHandler } from '@api/o-auth/refresh-token';
import { oAuthMockRefreshTokenData } from '@app/o-auth/refresh-token';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthGetRefreshTokensHandler', () => {
  let handler: OAuthGetRefreshTokensHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OAuthGetRefreshTokensHandler,
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

    handler = module.get<OAuthGetRefreshTokensHandler>(
      OAuthGetRefreshTokensHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('OAuthGetRefreshTokensHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('OAuthGetRefreshTokensHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a oAuthMockRefreshTokenData', async () => {
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

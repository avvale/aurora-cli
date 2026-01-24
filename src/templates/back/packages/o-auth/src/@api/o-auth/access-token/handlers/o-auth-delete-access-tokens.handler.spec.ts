/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthDeleteAccessTokensHandler } from '@api/o-auth/access-token';
import { oAuthMockAccessTokenData } from '@app/o-auth/access-token';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteAccessTokensHandler', () => {
  let handler: OAuthDeleteAccessTokensHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OAuthDeleteAccessTokensHandler,
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

    handler = module.get<OAuthDeleteAccessTokensHandler>(
      OAuthDeleteAccessTokensHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('OAuthDeleteAccessTokensHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('OAuthDeleteAccessTokensHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an oAuthMockAccessTokenData deleted', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(oAuthMockAccessTokenData)),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        oAuthMockAccessTokenData,
      );
    });
  });
});

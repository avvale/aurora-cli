/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  OAuthDeleteRefreshTokensHandler,
  OAuthDeleteRefreshTokensResolver,
} from '@api/o-auth/refresh-token';
import { oAuthMockRefreshTokenData } from '@app/o-auth/refresh-token';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteRefreshTokensResolver', () => {
  let resolver: OAuthDeleteRefreshTokensResolver;
  let handler: OAuthDeleteRefreshTokensHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OAuthDeleteRefreshTokensResolver,
        {
          provide: OAuthDeleteRefreshTokensHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<OAuthDeleteRefreshTokensResolver>(
      OAuthDeleteRefreshTokensResolver,
    );
    handler = module.get<OAuthDeleteRefreshTokensHandler>(
      OAuthDeleteRefreshTokensHandler,
    );
  });

  test('OAuthDeleteRefreshTokensResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('OAuthDeleteRefreshTokensResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an oAuthMockRefreshTokenData deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(oAuthMockRefreshTokenData)),
        );
      expect(await resolver.main()).toBe(oAuthMockRefreshTokenData);
    });
  });
});

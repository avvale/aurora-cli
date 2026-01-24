/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  OAuthGetRefreshTokensHandler,
  OAuthGetRefreshTokensResolver,
} from '@api/o-auth/refresh-token';
import { oAuthMockRefreshTokenData } from '@app/o-auth/refresh-token';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthGetRefreshTokensResolver', () => {
  let resolver: OAuthGetRefreshTokensResolver;
  let handler: OAuthGetRefreshTokensHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OAuthGetRefreshTokensResolver,
        {
          provide: OAuthGetRefreshTokensHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<OAuthGetRefreshTokensResolver>(
      OAuthGetRefreshTokensResolver,
    );
    handler = module.get<OAuthGetRefreshTokensHandler>(
      OAuthGetRefreshTokensHandler,
    );
  });

  test('OAuthGetRefreshTokensResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('OAuthGetRefreshTokensResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a oAuthMockRefreshTokenData', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(oAuthMockRefreshTokenData)),
        );
      expect(await resolver.main()).toBe(oAuthMockRefreshTokenData);
    });
  });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  OAuthPaginateAccessTokensHandler,
  OAuthPaginateAccessTokensResolver,
} from '@api/o-auth/access-token';
import { oAuthMockAccessTokenData } from '@app/o-auth/access-token';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthPaginateAccessTokensResolver', () => {
  let resolver: OAuthPaginateAccessTokensResolver;
  let handler: OAuthPaginateAccessTokensHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OAuthPaginateAccessTokensResolver,
        {
          provide: OAuthPaginateAccessTokensHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<OAuthPaginateAccessTokensResolver>(
      OAuthPaginateAccessTokensResolver,
    );
    handler = module.get<OAuthPaginateAccessTokensHandler>(
      OAuthPaginateAccessTokensHandler,
    );
  });

  test('OAuthPaginateAccessTokensResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('OAuthPaginateAccessTokensResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a oAuthMockAccessTokenData', async () => {
      jest.spyOn(handler, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: 5,
              count: 5,
              rows: oAuthMockAccessTokenData,
            }),
          ),
      );
      expect(await resolver.main()).toStrictEqual({
        total: 5,
        count: 5,
        rows: oAuthMockAccessTokenData,
      });
    });
  });
});

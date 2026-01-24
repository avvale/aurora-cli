/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  OAuthGetAccessTokensHandler,
  OAuthGetAccessTokensResolver,
} from '@api/o-auth/access-token';
import { oAuthMockAccessTokenData } from '@app/o-auth/access-token';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthGetAccessTokensResolver', () => {
  let resolver: OAuthGetAccessTokensResolver;
  let handler: OAuthGetAccessTokensHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OAuthGetAccessTokensResolver,
        {
          provide: OAuthGetAccessTokensHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<OAuthGetAccessTokensResolver>(
      OAuthGetAccessTokensResolver,
    );
    handler = module.get<OAuthGetAccessTokensHandler>(
      OAuthGetAccessTokensHandler,
    );
  });

  test('OAuthGetAccessTokensResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('OAuthGetAccessTokensResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a oAuthMockAccessTokenData', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(oAuthMockAccessTokenData)),
        );
      expect(await resolver.main()).toBe(oAuthMockAccessTokenData);
    });
  });
});

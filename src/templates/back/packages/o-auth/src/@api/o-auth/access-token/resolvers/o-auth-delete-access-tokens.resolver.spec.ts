/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  OAuthDeleteAccessTokensHandler,
  OAuthDeleteAccessTokensResolver,
} from '@api/o-auth/access-token';
import { oAuthMockAccessTokenData } from '@app/o-auth/access-token';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteAccessTokensResolver', () => {
  let resolver: OAuthDeleteAccessTokensResolver;
  let handler: OAuthDeleteAccessTokensHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OAuthDeleteAccessTokensResolver,
        {
          provide: OAuthDeleteAccessTokensHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<OAuthDeleteAccessTokensResolver>(
      OAuthDeleteAccessTokensResolver,
    );
    handler = module.get<OAuthDeleteAccessTokensHandler>(
      OAuthDeleteAccessTokensHandler,
    );
  });

  test('OAuthDeleteAccessTokensResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('OAuthDeleteAccessTokensResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an oAuthMockAccessTokenData deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(oAuthMockAccessTokenData)),
        );
      expect(await resolver.main()).toBe(oAuthMockAccessTokenData);
    });
  });
});

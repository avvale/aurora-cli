/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  OAuthDeleteAccessTokenByIdHandler,
  OAuthDeleteAccessTokenByIdResolver,
} from '@api/o-auth/access-token';
import { oAuthMockAccessTokenData } from '@app/o-auth/access-token';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteAccessTokenByIdResolver', () => {
  let resolver: OAuthDeleteAccessTokenByIdResolver;
  let handler: OAuthDeleteAccessTokenByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OAuthDeleteAccessTokenByIdResolver,
        {
          provide: OAuthDeleteAccessTokenByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<OAuthDeleteAccessTokenByIdResolver>(
      OAuthDeleteAccessTokenByIdResolver,
    );
    handler = module.get<OAuthDeleteAccessTokenByIdHandler>(
      OAuthDeleteAccessTokenByIdHandler,
    );
  });

  test('OAuthDeleteAccessTokenByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('OAuthDeleteAccessTokenByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an accessToken deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(oAuthMockAccessTokenData[0])),
        );
      expect(await resolver.main(oAuthMockAccessTokenData[0].id)).toBe(
        oAuthMockAccessTokenData[0],
      );
    });
  });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  OAuthFindAccessTokenByIdHandler,
  OAuthFindAccessTokenByIdResolver,
} from '@api/o-auth/access-token';
import { oAuthMockAccessTokenData } from '@app/o-auth/access-token';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindAccessTokenByIdResolver', () => {
  let resolver: OAuthFindAccessTokenByIdResolver;
  let handler: OAuthFindAccessTokenByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OAuthFindAccessTokenByIdResolver,
        {
          provide: OAuthFindAccessTokenByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<OAuthFindAccessTokenByIdResolver>(
      OAuthFindAccessTokenByIdResolver,
    );
    handler = module.get<OAuthFindAccessTokenByIdHandler>(
      OAuthFindAccessTokenByIdHandler,
    );
  });

  test('OAuthFindAccessTokenByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('OAuthFindAccessTokenByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an accessToken by id', async () => {
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

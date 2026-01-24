/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  OAuthFindScopeByIdHandler,
  OAuthFindScopeByIdResolver,
} from '@api/o-auth/scope';
import { oAuthMockScopeData } from '@app/o-auth/scope';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindScopeByIdResolver', () => {
  let resolver: OAuthFindScopeByIdResolver;
  let handler: OAuthFindScopeByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OAuthFindScopeByIdResolver,
        {
          provide: OAuthFindScopeByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<OAuthFindScopeByIdResolver>(
      OAuthFindScopeByIdResolver,
    );
    handler = module.get<OAuthFindScopeByIdHandler>(OAuthFindScopeByIdHandler);
  });

  test('OAuthFindScopeByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('OAuthFindScopeByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an scope by id', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(oAuthMockScopeData[0])),
        );
      expect(await resolver.main(oAuthMockScopeData[0].id)).toBe(
        oAuthMockScopeData[0],
      );
    });
  });
});

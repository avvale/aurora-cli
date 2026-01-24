/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  OAuthPaginateScopesHandler,
  OAuthPaginateScopesResolver,
} from '@api/o-auth/scope';
import { oAuthMockScopeData } from '@app/o-auth/scope';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthPaginateScopesResolver', () => {
  let resolver: OAuthPaginateScopesResolver;
  let handler: OAuthPaginateScopesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OAuthPaginateScopesResolver,
        {
          provide: OAuthPaginateScopesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<OAuthPaginateScopesResolver>(
      OAuthPaginateScopesResolver,
    );
    handler = module.get<OAuthPaginateScopesHandler>(
      OAuthPaginateScopesHandler,
    );
  });

  test('OAuthPaginateScopesResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('OAuthPaginateScopesResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a oAuthMockScopeData', async () => {
      jest.spyOn(handler, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: 5,
              count: 5,
              rows: oAuthMockScopeData,
            }),
          ),
      );
      expect(await resolver.main()).toStrictEqual({
        total: 5,
        count: 5,
        rows: oAuthMockScopeData,
      });
    });
  });
});

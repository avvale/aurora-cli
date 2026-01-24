/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthPaginateScopesHandler } from '@api/o-auth/scope';
import { oAuthMockScopeData } from '@app/o-auth/scope';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthPaginateScopesHandler', () => {
  let handler: OAuthPaginateScopesHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OAuthPaginateScopesHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<OAuthPaginateScopesHandler>(
      OAuthPaginateScopesHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('OAuthPaginateScopesHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('OAuthPaginateScopesHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a scopes', async () => {
      jest.spyOn(queryBus, 'ask').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: oAuthMockScopeData.length,
              count: oAuthMockScopeData.length,
              rows: oAuthMockScopeData,
            }),
          ),
      );
      expect(await handler.main({}, {})).toEqual({
        total: oAuthMockScopeData.length,
        count: oAuthMockScopeData.length,
        rows: oAuthMockScopeData,
      });
    });
  });
});

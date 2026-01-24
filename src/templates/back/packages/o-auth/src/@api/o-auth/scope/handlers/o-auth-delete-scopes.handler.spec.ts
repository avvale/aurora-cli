/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthDeleteScopesHandler } from '@api/o-auth/scope';
import { oAuthMockScopeData } from '@app/o-auth/scope';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteScopesHandler', () => {
  let handler: OAuthDeleteScopesHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OAuthDeleteScopesHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
        {
          provide: ICommandBus,
          useValue: {
            dispatch: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<OAuthDeleteScopesHandler>(OAuthDeleteScopesHandler);
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('OAuthDeleteScopesHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('OAuthDeleteScopesHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an oAuthMockScopeData deleted', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(oAuthMockScopeData)),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        oAuthMockScopeData,
      );
    });
  });
});

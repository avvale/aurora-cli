/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthUpdateScopeByIdInput } from '@api/graphql';
import { OAuthUpdateScopeByIdHandler } from '@api/o-auth/scope';
import { oAuthMockScopeData } from '@app/o-auth/scope';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateScopeByIdHandler', () => {
  let handler: OAuthUpdateScopeByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OAuthUpdateScopeByIdHandler,
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

    handler = module.get<OAuthUpdateScopeByIdHandler>(
      OAuthUpdateScopeByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('OAuthUpdateScopeByIdHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('OAuthUpdateScopeByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a scope updated', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(oAuthMockScopeData[0])),
        );
      expect(
        await handler.main(
          <OAuthUpdateScopeByIdInput>oAuthMockScopeData[0],
          {},
          'Europe/Madrid',
        ),
      ).toBe(oAuthMockScopeData[0]);
    });
  });
});

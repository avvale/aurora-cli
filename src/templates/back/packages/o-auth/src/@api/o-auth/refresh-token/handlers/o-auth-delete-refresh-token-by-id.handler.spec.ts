/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthDeleteRefreshTokenByIdHandler } from '@api/o-auth/refresh-token';
import { oAuthMockRefreshTokenData } from '@app/o-auth/refresh-token';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteRefreshTokenByIdController', () => {
  let handler: OAuthDeleteRefreshTokenByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OAuthDeleteRefreshTokenByIdHandler,
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

    handler = module.get<OAuthDeleteRefreshTokenByIdHandler>(
      OAuthDeleteRefreshTokenByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('OAuthDeleteRefreshTokenByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an refreshToken deleted', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(oAuthMockRefreshTokenData[0])),
        );
      expect(
        await handler.main(
          oAuthMockRefreshTokenData[0].id,
          {},
          'Europe/Madrid',
        ),
      ).toBe(oAuthMockRefreshTokenData[0]);
    });
  });
});

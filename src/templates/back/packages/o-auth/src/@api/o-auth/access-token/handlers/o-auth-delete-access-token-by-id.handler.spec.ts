/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthDeleteAccessTokenByIdHandler } from '@api/o-auth/access-token';
import { oAuthMockAccessTokenData } from '@app/o-auth/access-token';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteAccessTokenByIdController', () => {
  let handler: OAuthDeleteAccessTokenByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OAuthDeleteAccessTokenByIdHandler,
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

    handler = module.get<OAuthDeleteAccessTokenByIdHandler>(
      OAuthDeleteAccessTokenByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('OAuthDeleteAccessTokenByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an accessToken deleted', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(oAuthMockAccessTokenData[0])),
        );
      expect(
        await handler.main(oAuthMockAccessTokenData[0].id, {}, 'Europe/Madrid'),
      ).toBe(oAuthMockAccessTokenData[0]);
    });
  });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthFindClientByIdHandler } from '@api/o-auth/client';
import { oAuthMockClientData } from '@app/o-auth/client';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindClientByIdHandler', () => {
  let handler: OAuthFindClientByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OAuthFindClientByIdHandler,
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

    handler = module.get<OAuthFindClientByIdHandler>(
      OAuthFindClientByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('OAuthFindClientByIdHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('OAuthFindClientByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an client by id', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(oAuthMockClientData[0])),
        );
      expect(
        await handler.main(oAuthMockClientData[0].id, {}, 'Europe/Madrid'),
      ).toBe(oAuthMockClientData[0]);
    });
  });
});

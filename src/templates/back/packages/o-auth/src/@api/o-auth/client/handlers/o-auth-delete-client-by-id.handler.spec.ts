/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthDeleteClientByIdHandler } from '@api/o-auth/client';
import { oAuthMockClientData } from '@app/o-auth/client';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteClientByIdController', () => {
  let handler: OAuthDeleteClientByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OAuthDeleteClientByIdHandler,
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

    handler = module.get<OAuthDeleteClientByIdHandler>(
      OAuthDeleteClientByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('OAuthDeleteClientByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an client deleted', async () => {
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

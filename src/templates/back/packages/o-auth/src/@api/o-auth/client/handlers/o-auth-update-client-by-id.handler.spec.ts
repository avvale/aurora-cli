/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthUpdateClientByIdInput } from '@api/graphql';
import { OAuthUpdateClientByIdHandler } from '@api/o-auth/client';
import { oAuthMockClientData } from '@app/o-auth/client';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateClientByIdHandler', () => {
  let handler: OAuthUpdateClientByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OAuthUpdateClientByIdHandler,
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

    handler = module.get<OAuthUpdateClientByIdHandler>(
      OAuthUpdateClientByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('OAuthUpdateClientByIdHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('OAuthUpdateClientByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a client updated', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(oAuthMockClientData[0])),
        );
      expect(
        await handler.main(
          <OAuthUpdateClientByIdInput>oAuthMockClientData[0],
          {},
          'Europe/Madrid',
        ),
      ).toBe(oAuthMockClientData[0]);
    });
  });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamDeleteAccountByIdHandler } from '@api/iam/account';
import { iamMockAccountData } from '@app/iam/account';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteAccountByIdController', () => {
  let handler: IamDeleteAccountByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamDeleteAccountByIdHandler,
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

    handler = module.get<IamDeleteAccountByIdHandler>(
      IamDeleteAccountByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('IamDeleteAccountByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an account deleted', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockAccountData[0])),
        );
      expect(
        await handler.main(iamMockAccountData[0].id, {}, 'Europe/Madrid'),
      ).toBe(iamMockAccountData[0]);
    });
  });
});

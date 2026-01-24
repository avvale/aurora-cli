/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamCreateRoleAccountHandler } from '@api/iam/role-account';
import { iamMockRoleAccountData } from '@app/iam/role-account';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateRoleAccountHandler', () => {
  let handler: IamCreateRoleAccountHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamCreateRoleAccountHandler,
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

    handler = module.get<IamCreateRoleAccountHandler>(
      IamCreateRoleAccountHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('IamCreateRoleAccountHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an roleAccount created', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockRoleAccountData[0])),
        );
      expect(
        await handler.main(iamMockRoleAccountData[0], 'Europe/Madrid'),
      ).toBe(iamMockRoleAccountData[0]);
    });
  });
});

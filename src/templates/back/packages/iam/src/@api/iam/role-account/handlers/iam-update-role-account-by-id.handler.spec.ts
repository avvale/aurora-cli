/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateRoleAccountByIdInput } from '@api/graphql';
import { IamUpdateRoleAccountByIdHandler } from '@api/iam/role-account';
import { iamMockRoleAccountData } from '@app/iam/role-account';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateRoleAccountByIdHandler', () => {
  let handler: IamUpdateRoleAccountByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamUpdateRoleAccountByIdHandler,
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

    handler = module.get<IamUpdateRoleAccountByIdHandler>(
      IamUpdateRoleAccountByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('IamUpdateRoleAccountByIdHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('IamUpdateRoleAccountByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a roleAccount updated', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockRoleAccountData[0])),
        );
      expect(
        await handler.main(
          <IamUpdateRoleAccountByIdInput>iamMockRoleAccountData[0],
          {},
          'Europe/Madrid',
        ),
      ).toBe(iamMockRoleAccountData[0]);
    });
  });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamDeleteRoleByIdHandler } from '@api/iam/role';
import { iamMockRoleData } from '@app/iam/role';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteRoleByIdController', () => {
  let handler: IamDeleteRoleByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamDeleteRoleByIdHandler,
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

    handler = module.get<IamDeleteRoleByIdHandler>(IamDeleteRoleByIdHandler);
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('IamDeleteRoleByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an role deleted', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockRoleData[0])),
        );
      expect(
        await handler.main(iamMockRoleData[0].id, {}, 'Europe/Madrid'),
      ).toBe(iamMockRoleData[0]);
    });
  });
});

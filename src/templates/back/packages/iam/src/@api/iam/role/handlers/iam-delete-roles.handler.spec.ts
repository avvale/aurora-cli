/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamDeleteRolesHandler } from '@api/iam/role';
import { iamMockRoleData } from '@app/iam/role';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteRolesHandler', () => {
  let handler: IamDeleteRolesHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamDeleteRolesHandler,
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

    handler = module.get<IamDeleteRolesHandler>(IamDeleteRolesHandler);
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('IamDeleteRolesHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('IamDeleteRolesHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an iamMockRoleData deleted', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockRoleData)),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(iamMockRoleData);
    });
  });
});

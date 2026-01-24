/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateRolesInput } from '@api/graphql';
import { IamUpdateRolesHandler } from '@api/iam/role';
import { iamMockRoleData } from '@app/iam/role';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateRolesHandler', () => {
  let handler: IamUpdateRolesHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamUpdateRolesHandler,
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

    handler = module.get<IamUpdateRolesHandler>(IamUpdateRolesHandler);
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('IamUpdateRolesHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('IamUpdateRolesHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a roles updated', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockRoleData[0])),
        );
      expect(
        await handler.main(
          <IamUpdateRolesInput>iamMockRoleData[0],
          {},
          {},
          'Europe/Madrid',
        ),
      ).toBe(iamMockRoleData[0]);
    });
  });
});

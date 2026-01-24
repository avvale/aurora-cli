/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamDeleteUsersHandler } from '@api/iam/user';
import { iamMockUserData } from '@app/iam/user';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteUsersHandler', () => {
  let handler: IamDeleteUsersHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamDeleteUsersHandler,
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

    handler = module.get<IamDeleteUsersHandler>(IamDeleteUsersHandler);
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('IamDeleteUsersHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('IamDeleteUsersHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an iamMockUserData deleted', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockUserData)),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(iamMockUserData);
    });
  });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateUserByIdInput } from '@api/graphql';
import { IamUpdateUserMetaByIdHandler } from './iam-update-user-meta-by-id.handler';

// sources
import { users } from '@app/iam/user/infrastructure/mock/mock-user.data';

describe('IamUpdateUserByIdHandler', () => {
  let handler: IamUpdateUserMetaByIdHandler;
  let queryBus: IQueryBus;
  let commandBus: ICommandBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamUpdateUserMetaByIdHandler,
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

    handler = module.get<IamUpdateUserMetaByIdHandler>(
      IamUpdateUserMetaByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
    commandBus = module.get<ICommandBus>(ICommandBus);
  });

  test('IamUpdateUserByIdHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('IamUpdateUserByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a user updated', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(() => new Promise((resolve) => resolve(users[0])));
      expect(await handler.main(<IamUpdateUserByIdInput>users[0])).toBe(
        users[0],
      );
    });
  });
});

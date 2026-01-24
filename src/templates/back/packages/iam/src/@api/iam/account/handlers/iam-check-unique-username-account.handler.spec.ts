/* eslint-disable @typescript-eslint/no-unused-vars */
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';
import { IamCheckUniqueUsernameAccountHandler } from './iam-check-unique-username-account.handler';

describe('IamCheckUniqueUsernameAccountHandler', () => {
  let handler: IamCheckUniqueUsernameAccountHandler;
  let queryBus: IQueryBus;
  let commandBus: ICommandBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamCheckUniqueUsernameAccountHandler,
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

    handler = module.get<IamCheckUniqueUsernameAccountHandler>(
      IamCheckUniqueUsernameAccountHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
    commandBus = module.get<ICommandBus>(ICommandBus);
  });

  describe('main', () => {
    test('IamCheckUniqueUsernameAccountHandler should be defined', () => {
      expect(handler).toBeDefined();
    });
  });
});

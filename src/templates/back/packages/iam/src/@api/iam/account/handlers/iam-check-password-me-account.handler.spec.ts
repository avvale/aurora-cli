/* eslint-disable @typescript-eslint/no-unused-vars */
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';
import { IamCheckPasswordMeAccountHandler } from './iam-check-password-me-account.handler';

describe('IamCheckPasswordMeAccountHandler', () => {
  let handler: IamCheckPasswordMeAccountHandler;
  let queryBus: IQueryBus;
  let commandBus: ICommandBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamCheckPasswordMeAccountHandler,
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

    handler = module.get<IamCheckPasswordMeAccountHandler>(
      IamCheckPasswordMeAccountHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
    commandBus = module.get<ICommandBus>(ICommandBus);
  });

  describe('main', () => {
    test('IamCheckPasswordMeAccountHandler should be defined', () => {
      expect(handler).toBeDefined();
    });
  });
});

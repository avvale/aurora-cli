/* eslint-disable @typescript-eslint/no-unused-vars */
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';
import { IamCheckUniqueEmailAccountHandler } from './iam-check-unique-email-account.handler';

describe('IamCheckUniqueEmailAccountHandler', () => {
  let handler: IamCheckUniqueEmailAccountHandler;
  let queryBus: IQueryBus;
  let commandBus: ICommandBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamCheckUniqueEmailAccountHandler,
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

    handler = module.get<IamCheckUniqueEmailAccountHandler>(
      IamCheckUniqueEmailAccountHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
    commandBus = module.get<ICommandBus>(ICommandBus);
  });

  describe('main', () => {
    test('IamCheckUniqueEmailAccountHandler should be defined', () => {
      expect(handler).toBeDefined();
    });
  });
});

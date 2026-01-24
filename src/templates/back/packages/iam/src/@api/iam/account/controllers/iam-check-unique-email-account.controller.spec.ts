/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { IamCheckUniqueEmailAccountHandler } from '../handlers/iam-check-unique-email-account.handler';
import { IamCheckUniqueEmailAccountController } from './iam-check-unique-email-account.controller';

describe('IamCheckUniqueEmailAccountController', () => {
  let controller: IamCheckUniqueEmailAccountController;
  let handler: IamCheckUniqueEmailAccountHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamCheckUniqueEmailAccountController],
      providers: [
        {
          provide: IamCheckUniqueEmailAccountHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamCheckUniqueEmailAccountController>(
      IamCheckUniqueEmailAccountController,
    );
    handler = module.get<IamCheckUniqueEmailAccountHandler>(
      IamCheckUniqueEmailAccountHandler,
    );
  });

  describe('main', () => {
    test('IamCheckUniqueEmailAccountController should be defined', () => {
      expect(controller).toBeDefined();
    });
  });
});

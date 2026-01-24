/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { IamResetPasswordUserHandler } from '../handlers/iam-reset-password-user.handler';
import { IamResetPasswordUserController } from './iam-reset-password-user.controller';

describe('IamResetPasswordUserController', () => {
  let controller: IamResetPasswordUserController;
  let handler: IamResetPasswordUserHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamResetPasswordUserController],
      providers: [
        {
          provide: IamResetPasswordUserHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamResetPasswordUserController>(
      IamResetPasswordUserController,
    );
    handler = module.get<IamResetPasswordUserHandler>(
      IamResetPasswordUserHandler,
    );
  });

  describe('main', () => {
    test('IamResetPasswordUserController should be defined', () => {
      expect(controller).toBeDefined();
    });
  });
});

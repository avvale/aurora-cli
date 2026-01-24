/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { IamForgotPasswordUserHandler } from '../handlers/iam-forgot-password-user.handler';
import { IamForgotPasswordUserController } from './iam-forgot-password-user.controller';

describe('IamForgotPasswordUserController', () => {
  let controller: IamForgotPasswordUserController;
  let handler: IamForgotPasswordUserHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamForgotPasswordUserController],
      providers: [
        {
          provide: IamForgotPasswordUserHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamForgotPasswordUserController>(
      IamForgotPasswordUserController,
    );
    handler = module.get<IamForgotPasswordUserHandler>(
      IamForgotPasswordUserHandler,
    );
  });

  describe('main', () => {
    test('IamForgotPasswordUserController should be defined', () => {
      expect(controller).toBeDefined();
    });
  });
});

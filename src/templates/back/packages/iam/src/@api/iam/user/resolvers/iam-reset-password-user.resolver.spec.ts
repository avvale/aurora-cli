/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { IamResetPasswordUserHandler } from '../handlers/iam-reset-password-user.handler';
import { IamResetPasswordUserResolver } from './iam-reset-password-user.resolver';

describe('IamResetPasswordUserResolver', () => {
  let resolver: IamResetPasswordUserResolver;
  let handler: IamResetPasswordUserHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamResetPasswordUserResolver,
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

    resolver = module.get<IamResetPasswordUserResolver>(
      IamResetPasswordUserResolver,
    );
    handler = module.get<IamResetPasswordUserHandler>(
      IamResetPasswordUserHandler,
    );
  });

  test('IamResetPasswordUserResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamResetPasswordUserResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });
  });
});

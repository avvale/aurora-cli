/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { IamCheckPasswordMeAccountHandler } from '../handlers/iam-check-password-me-account.handler';
import { IamCheckPasswordMeAccountResolver } from './iam-check-password-me-account.resolver';

describe('IamCheckPasswordMeAccountResolver', () => {
  let resolver: IamCheckPasswordMeAccountResolver;
  let handler: IamCheckPasswordMeAccountHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamCheckPasswordMeAccountResolver,
        {
          provide: IamCheckPasswordMeAccountHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<IamCheckPasswordMeAccountResolver>(
      IamCheckPasswordMeAccountResolver,
    );
    handler = module.get<IamCheckPasswordMeAccountHandler>(
      IamCheckPasswordMeAccountHandler,
    );
  });

  test('IamCheckPasswordMeAccountResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamCheckPasswordMeAccountResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });
  });
});

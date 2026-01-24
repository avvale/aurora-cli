/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { IamCheckUniqueUsernameAccountHandler } from '../handlers/iam-check-unique-username-account.handler';
import { IamCheckUniqueUsernameAccountResolver } from './iam-check-unique-username-account.resolver';

describe('IamCheckUniqueUsernameAccountResolver', () => {
  let resolver: IamCheckUniqueUsernameAccountResolver;
  let handler: IamCheckUniqueUsernameAccountHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamCheckUniqueUsernameAccountResolver,
        {
          provide: IamCheckUniqueUsernameAccountHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<IamCheckUniqueUsernameAccountResolver>(
      IamCheckUniqueUsernameAccountResolver,
    );
    handler = module.get<IamCheckUniqueUsernameAccountHandler>(
      IamCheckUniqueUsernameAccountHandler,
    );
  });

  test('IamCheckUniqueUsernameAccountResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamCheckUniqueUsernameAccountResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });
  });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { IamCheckUniqueEmailAccountHandler } from '../handlers/iam-check-unique-email-account.handler';
import { IamCheckUniqueEmailAccountResolver } from './iam-check-unique-email-account.resolver';

describe('IamCheckUniqueEmailAccountResolver', () => {
  let resolver: IamCheckUniqueEmailAccountResolver;
  let handler: IamCheckUniqueEmailAccountHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamCheckUniqueEmailAccountResolver,
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

    resolver = module.get<IamCheckUniqueEmailAccountResolver>(
      IamCheckUniqueEmailAccountResolver,
    );
    handler = module.get<IamCheckUniqueEmailAccountHandler>(
      IamCheckUniqueEmailAccountHandler,
    );
  });

  test('IamCheckUniqueEmailAccountResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamCheckUniqueEmailAccountResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });
  });
});

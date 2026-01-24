/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { IamUpdateMeAccountHandler } from '../handlers/iam-update-me-account.handler';
import { IamUpdateMeAccountResolver } from './iam-update-me-account.resolver';

describe('IamUpdateMeAccountResolver', () => {
  let resolver: IamUpdateMeAccountResolver;
  let handler: IamUpdateMeAccountHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamUpdateMeAccountResolver,
        {
          provide: IamUpdateMeAccountHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<IamUpdateMeAccountResolver>(
      IamUpdateMeAccountResolver,
    );
    handler = module.get<IamUpdateMeAccountHandler>(IamUpdateMeAccountHandler);
  });

  test('IamUpdateMeAccountResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamUpdateMeAccountResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });
  });
});

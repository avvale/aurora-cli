/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateAccountsInput } from '@api/graphql';
import {
  IamUpdateAccountsHandler,
  IamUpdateAccountsResolver,
} from '@api/iam/account';
import { iamMockAccountData } from '@app/iam/account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateAccountsResolver', () => {
  let resolver: IamUpdateAccountsResolver;
  let handler: IamUpdateAccountsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamUpdateAccountsResolver,
        {
          provide: IamUpdateAccountsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<IamUpdateAccountsResolver>(IamUpdateAccountsResolver);
    handler = module.get<IamUpdateAccountsHandler>(IamUpdateAccountsHandler);
  });

  test('IamUpdateAccountsResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamUpdateAccountsResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a accounts updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockAccountData[0])),
        );
      expect(
        await resolver.main(<IamUpdateAccountsInput>iamMockAccountData[0]),
      ).toBe(iamMockAccountData[0]);
    });
  });
});

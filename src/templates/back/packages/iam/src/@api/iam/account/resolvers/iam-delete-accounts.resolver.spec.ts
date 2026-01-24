/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IamDeleteAccountsHandler,
  IamDeleteAccountsResolver,
} from '@api/iam/account';
import { iamMockAccountData } from '@app/iam/account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteAccountsResolver', () => {
  let resolver: IamDeleteAccountsResolver;
  let handler: IamDeleteAccountsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamDeleteAccountsResolver,
        {
          provide: IamDeleteAccountsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<IamDeleteAccountsResolver>(IamDeleteAccountsResolver);
    handler = module.get<IamDeleteAccountsHandler>(IamDeleteAccountsHandler);
  });

  test('IamDeleteAccountsResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamDeleteAccountsResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an iamMockAccountData deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockAccountData)),
        );
      expect(await resolver.main()).toBe(iamMockAccountData);
    });
  });
});

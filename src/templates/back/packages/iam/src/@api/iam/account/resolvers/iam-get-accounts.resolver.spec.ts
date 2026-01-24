/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IamGetAccountsHandler,
  IamGetAccountsResolver,
} from '@api/iam/account';
import { iamMockAccountData } from '@app/iam/account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetAccountsResolver', () => {
  let resolver: IamGetAccountsResolver;
  let handler: IamGetAccountsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamGetAccountsResolver,
        {
          provide: IamGetAccountsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<IamGetAccountsResolver>(IamGetAccountsResolver);
    handler = module.get<IamGetAccountsHandler>(IamGetAccountsHandler);
  });

  test('IamGetAccountsResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamGetAccountsResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a iamMockAccountData', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockAccountData)),
        );
      expect(await resolver.main()).toBe(iamMockAccountData);
    });
  });
});

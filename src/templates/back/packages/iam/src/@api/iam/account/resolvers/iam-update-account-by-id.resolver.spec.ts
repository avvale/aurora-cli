/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateAccountByIdInput } from '@api/graphql';
import {
  IamUpdateAccountByIdHandler,
  IamUpdateAccountByIdResolver,
} from '@api/iam/account';
import { iamMockAccountData } from '@app/iam/account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateAccountByIdResolver', () => {
  let resolver: IamUpdateAccountByIdResolver;
  let handler: IamUpdateAccountByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamUpdateAccountByIdResolver,
        {
          provide: IamUpdateAccountByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<IamUpdateAccountByIdResolver>(
      IamUpdateAccountByIdResolver,
    );
    handler = module.get<IamUpdateAccountByIdHandler>(
      IamUpdateAccountByIdHandler,
    );
  });

  test('IamUpdateAccountByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamUpdateAccountByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a account by id updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockAccountData[0])),
        );
      expect(
        await resolver.main(<IamUpdateAccountByIdInput>iamMockAccountData[0]),
      ).toBe(iamMockAccountData[0]);
    });
  });
});

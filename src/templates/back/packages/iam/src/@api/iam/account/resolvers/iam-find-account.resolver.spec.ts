/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IamFindAccountHandler,
  IamFindAccountResolver,
} from '@api/iam/account';
import { iamMockAccountData } from '@app/iam/account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindAccountResolver', () => {
  let resolver: IamFindAccountResolver;
  let handler: IamFindAccountHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamFindAccountResolver,
        {
          provide: IamFindAccountHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<IamFindAccountResolver>(IamFindAccountResolver);
    handler = module.get<IamFindAccountHandler>(IamFindAccountHandler);
  });

  test('IamFindAccountResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamFindAccountResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a account', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockAccountData[0])),
        );
      expect(await resolver.main()).toBe(iamMockAccountData[0]);
    });
  });
});

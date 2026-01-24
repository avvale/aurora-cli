/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamGetUsersHandler, IamGetUsersResolver } from '@api/iam/user';
import { iamMockUserData } from '@app/iam/user';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetUsersResolver', () => {
  let resolver: IamGetUsersResolver;
  let handler: IamGetUsersHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamGetUsersResolver,
        {
          provide: IamGetUsersHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<IamGetUsersResolver>(IamGetUsersResolver);
    handler = module.get<IamGetUsersHandler>(IamGetUsersHandler);
  });

  test('IamGetUsersResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamGetUsersResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a iamMockUserData', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockUserData)),
        );
      expect(await resolver.main()).toBe(iamMockUserData);
    });
  });
});

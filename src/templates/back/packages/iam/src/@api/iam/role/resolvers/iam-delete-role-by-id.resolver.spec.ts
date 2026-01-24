/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IamDeleteRoleByIdHandler,
  IamDeleteRoleByIdResolver,
} from '@api/iam/role';
import { iamMockRoleData } from '@app/iam/role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteRoleByIdResolver', () => {
  let resolver: IamDeleteRoleByIdResolver;
  let handler: IamDeleteRoleByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamDeleteRoleByIdResolver,
        {
          provide: IamDeleteRoleByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<IamDeleteRoleByIdResolver>(IamDeleteRoleByIdResolver);
    handler = module.get<IamDeleteRoleByIdHandler>(IamDeleteRoleByIdHandler);
  });

  test('IamDeleteRoleByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamDeleteRoleByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an role deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockRoleData[0])),
        );
      expect(await resolver.main(iamMockRoleData[0].id)).toBe(
        iamMockRoleData[0],
      );
    });
  });
});

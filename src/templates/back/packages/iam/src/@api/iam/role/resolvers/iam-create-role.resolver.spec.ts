/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamCreateRoleInput } from '@api/graphql';
import { IamCreateRoleHandler, IamCreateRoleResolver } from '@api/iam/role';
import { iamMockRoleData } from '@app/iam/role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateRoleResolver', () => {
  let resolver: IamCreateRoleResolver;
  let handler: IamCreateRoleHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamCreateRoleResolver,
        {
          provide: IamCreateRoleHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<IamCreateRoleResolver>(IamCreateRoleResolver);
    handler = module.get<IamCreateRoleHandler>(IamCreateRoleHandler);
  });

  test('IamCreateRoleResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamCreateRoleResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an role created', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockRoleData[0])),
        );
      expect(await resolver.main(<IamCreateRoleInput>iamMockRoleData[0])).toBe(
        iamMockRoleData[0],
      );
    });
  });
});

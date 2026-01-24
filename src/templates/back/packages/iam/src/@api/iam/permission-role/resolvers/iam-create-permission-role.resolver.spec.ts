/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import { IamCreatePermissionRoleInput } from '@api/graphql';
import {
  IamCreatePermissionRoleHandler,
  IamCreatePermissionRoleResolver,
} from '@api/iam/permission-role';
import { iamMockPermissionRoleData } from '@app/iam/permission-role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreatePermissionRoleResolver', () => {
  let resolver: IamCreatePermissionRoleResolver;
  let handler: IamCreatePermissionRoleHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamCreatePermissionRoleResolver,
        {
          provide: IamCreatePermissionRoleHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<IamCreatePermissionRoleResolver>(
      IamCreatePermissionRoleResolver,
    );
    handler = module.get<IamCreatePermissionRoleHandler>(
      IamCreatePermissionRoleHandler,
    );
  });

  test('IamCreatePermissionRoleResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamCreatePermissionRoleResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an permissionRole created', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockPermissionRoleData[0])),
        );
      expect(
        await resolver.main(
          <IamCreatePermissionRoleInput>iamMockPermissionRoleData[0],
        ),
      ).toBe(iamMockPermissionRoleData[0]);
    });
  });
});

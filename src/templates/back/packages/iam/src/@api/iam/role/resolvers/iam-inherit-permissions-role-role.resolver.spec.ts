/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { IamInheritPermissionsRoleRoleHandler } from '../handlers/iam-inherit-permissions-role-role.handler';
import { IamInheritPermissionsRoleRoleResolver } from './iam-inherit-permissions-role-role.resolver';

describe('IamInheritPermissionsRoleRoleResolver', () => {
  let resolver: IamInheritPermissionsRoleRoleResolver;
  let handler: IamInheritPermissionsRoleRoleHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamInheritPermissionsRoleRoleResolver,
        {
          provide: IamInheritPermissionsRoleRoleHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<IamInheritPermissionsRoleRoleResolver>(
      IamInheritPermissionsRoleRoleResolver,
    );
    handler = module.get<IamInheritPermissionsRoleRoleHandler>(
      IamInheritPermissionsRoleRoleHandler,
    );
  });

  test('IamInheritPermissionsRoleRoleResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamInheritPermissionsRoleRoleResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });
  });
});

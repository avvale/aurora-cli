/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { IamInheritPermissionsRoleRoleHandler } from '../handlers/iam-inherit-permissions-role-role.handler';
import { IamInheritPermissionsRoleRoleController } from './iam-inherit-permissions-role-role.controller';

describe('IamInheritPermissionsRoleRoleController', () => {
  let controller: IamInheritPermissionsRoleRoleController;
  let handler: IamInheritPermissionsRoleRoleHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamInheritPermissionsRoleRoleController],
      providers: [
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

    controller = module.get<IamInheritPermissionsRoleRoleController>(
      IamInheritPermissionsRoleRoleController,
    );
    handler = module.get<IamInheritPermissionsRoleRoleHandler>(
      IamInheritPermissionsRoleRoleHandler,
    );
  });

  describe('main', () => {
    test('IamInheritPermissionsRoleRoleController should be defined', () => {
      expect(controller).toBeDefined();
    });
  });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { IamGetWithTenantConstraintTenantsHandler } from '../handlers/iam-get-with-tenant-constraint-tenants.handler';
import { IamGetWithTenantConstraintTenantsController } from './iam-get-with-tenant-constraint-tenants.controller';

describe('IamGetWithTenantConstraintTenantsController', () => {
  let controller: IamGetWithTenantConstraintTenantsController;
  let handler: IamGetWithTenantConstraintTenantsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamGetWithTenantConstraintTenantsController],
      providers: [
        {
          provide: IamGetWithTenantConstraintTenantsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamGetWithTenantConstraintTenantsController>(
      IamGetWithTenantConstraintTenantsController,
    );
    handler = module.get<IamGetWithTenantConstraintTenantsHandler>(
      IamGetWithTenantConstraintTenantsHandler,
    );
  });

  describe('main', () => {
    test('IamGetWithTenantConstraintTenantsController should be defined', () => {
      expect(controller).toBeDefined();
    });
  });
});

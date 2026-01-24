/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { IamPaginateWithTenantConstraintTenantsHandler } from '../handlers/iam-paginate-with-tenant-constraint-tenants.handler';
import { IamPaginateWithTenantConstraintTenantsController } from './iam-paginate-with-tenant-constraint-tenants.controller';

describe('IamPaginateWithTenantConstraintTenantsController', () => {
  let controller: IamPaginateWithTenantConstraintTenantsController;
  let handler: IamPaginateWithTenantConstraintTenantsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamPaginateWithTenantConstraintTenantsController],
      providers: [
        {
          provide: IamPaginateWithTenantConstraintTenantsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamPaginateWithTenantConstraintTenantsController>(
      IamPaginateWithTenantConstraintTenantsController,
    );
    handler = module.get<IamPaginateWithTenantConstraintTenantsHandler>(
      IamPaginateWithTenantConstraintTenantsHandler,
    );
  });

  describe('main', () => {
    test('IamPaginateWithTenantConstraintTenantsController should be defined', () => {
      expect(controller).toBeDefined();
    });
  });
});

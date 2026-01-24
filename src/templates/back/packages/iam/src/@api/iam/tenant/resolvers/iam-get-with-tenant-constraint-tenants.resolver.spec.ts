/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { IamGetWithTenantConstraintTenantsHandler } from '../handlers/iam-get-with-tenant-constraint-tenants.handler';
import { IamGetWithTenantConstraintTenantsResolver } from './iam-get-with-tenant-constraint-tenants.resolver';

describe('IamGetWithTenantConstraintTenantsResolver', () => {
  let resolver: IamGetWithTenantConstraintTenantsResolver;
  let handler: IamGetWithTenantConstraintTenantsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamGetWithTenantConstraintTenantsResolver,
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

    resolver = module.get<IamGetWithTenantConstraintTenantsResolver>(
      IamGetWithTenantConstraintTenantsResolver,
    );
    handler = module.get<IamGetWithTenantConstraintTenantsHandler>(
      IamGetWithTenantConstraintTenantsHandler,
    );
  });

  test('IamGetWithTenantConstraintTenantsResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamGetWithTenantConstraintTenantsResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });
  });
});

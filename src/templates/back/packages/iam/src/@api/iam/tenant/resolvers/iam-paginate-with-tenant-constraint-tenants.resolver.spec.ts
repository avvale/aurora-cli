/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamPaginateWithTenantConstraintTenantsHandler } from '../handlers/iam-paginate-with-tenant-constraint-tenants.handler';
import { IamPaginateWithTenantConstraintTenantsResolver } from './iam-paginate-with-tenant-constraint-tenants.resolver';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateWithTenantConstraintTenantsResolver', () =>
{
    let resolver: IamPaginateWithTenantConstraintTenantsResolver;
    let handler: IamPaginateWithTenantConstraintTenantsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamPaginateWithTenantConstraintTenantsResolver,
                {
                    provide : IamPaginateWithTenantConstraintTenantsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamPaginateWithTenantConstraintTenantsResolver>(IamPaginateWithTenantConstraintTenantsResolver);
        handler = module.get<IamPaginateWithTenantConstraintTenantsHandler>(IamPaginateWithTenantConstraintTenantsHandler);
    });

    test('IamPaginateWithTenantConstraintTenantsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamPaginateWithTenantConstraintTenantsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });
    });
});
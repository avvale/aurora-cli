/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { IamPaginateWithTenantConstraintAccountsHandler } from '../handlers/iam-paginate-with-tenant-constraint-accounts.handler';
import { IamPaginateWithTenantConstraintAccountsResolver } from './iam-paginate-with-tenant-constraint-accounts.resolver';

describe('IamPaginateWithTenantConstraintAccountsResolver', () => {
    let resolver: IamPaginateWithTenantConstraintAccountsResolver;
    let handler: IamPaginateWithTenantConstraintAccountsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamPaginateWithTenantConstraintAccountsResolver,
                {
                    provide: IamPaginateWithTenantConstraintAccountsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamPaginateWithTenantConstraintAccountsResolver>(
            IamPaginateWithTenantConstraintAccountsResolver,
        );
        handler = module.get<IamPaginateWithTenantConstraintAccountsHandler>(
            IamPaginateWithTenantConstraintAccountsHandler,
        );
    });

    test('IamPaginateWithTenantConstraintAccountsResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamPaginateWithTenantConstraintAccountsResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });
    });
});

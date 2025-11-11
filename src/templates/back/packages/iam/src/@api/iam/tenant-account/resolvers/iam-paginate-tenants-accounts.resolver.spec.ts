/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamPaginateTenantsAccountsHandler,
    IamPaginateTenantsAccountsResolver,
} from '@api/iam/tenant-account';
import { iamMockTenantAccountData } from '@app/iam/tenant-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateTenantsAccountsResolver', () => {
    let resolver: IamPaginateTenantsAccountsResolver;
    let handler: IamPaginateTenantsAccountsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamPaginateTenantsAccountsResolver,
                {
                    provide: IamPaginateTenantsAccountsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamPaginateTenantsAccountsResolver>(
            IamPaginateTenantsAccountsResolver,
        );
        handler = module.get<IamPaginateTenantsAccountsHandler>(
            IamPaginateTenantsAccountsHandler,
        );
    });

    test('IamPaginateTenantsAccountsResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamPaginateTenantsAccountsResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a iamMockTenantAccountData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: 5,
                            count: 5,
                            rows: iamMockTenantAccountData,
                        }),
                    ),
            );
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows: iamMockTenantAccountData,
            });
        });
    });
});

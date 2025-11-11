/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateTenantAccountByIdInput } from '@api/graphql';
import {
    IamUpdateTenantAccountByIdHandler,
    IamUpdateTenantAccountByIdResolver,
} from '@api/iam/tenant-account';
import { iamMockTenantAccountData } from '@app/iam/tenant-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateTenantAccountByIdResolver', () => {
    let resolver: IamUpdateTenantAccountByIdResolver;
    let handler: IamUpdateTenantAccountByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamUpdateTenantAccountByIdResolver,
                {
                    provide: IamUpdateTenantAccountByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamUpdateTenantAccountByIdResolver>(
            IamUpdateTenantAccountByIdResolver,
        );
        handler = module.get<IamUpdateTenantAccountByIdHandler>(
            IamUpdateTenantAccountByIdHandler,
        );
    });

    test('IamUpdateTenantAccountByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamUpdateTenantAccountByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a tenantAccount by id updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(iamMockTenantAccountData[0]),
                    ),
            );
            expect(
                await resolver.main(
                    <IamUpdateTenantAccountByIdInput>(
                        iamMockTenantAccountData[0]
                    ),
                ),
            ).toBe(iamMockTenantAccountData[0]);
        });
    });
});

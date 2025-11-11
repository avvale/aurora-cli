/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamCreateTenantAccountInput } from '@api/graphql';
import {
    IamCreateTenantAccountHandler,
    IamCreateTenantAccountResolver,
} from '@api/iam/tenant-account';
import { iamMockTenantAccountData } from '@app/iam/tenant-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateTenantAccountResolver', () => {
    let resolver: IamCreateTenantAccountResolver;
    let handler: IamCreateTenantAccountHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamCreateTenantAccountResolver,
                {
                    provide: IamCreateTenantAccountHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamCreateTenantAccountResolver>(
            IamCreateTenantAccountResolver,
        );
        handler = module.get<IamCreateTenantAccountHandler>(
            IamCreateTenantAccountHandler,
        );
    });

    test('IamCreateTenantAccountResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamCreateTenantAccountResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an tenantAccount created', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(iamMockTenantAccountData[0]),
                    ),
            );
            expect(
                await resolver.main(
                    <IamCreateTenantAccountInput>iamMockTenantAccountData[0],
                ),
            ).toBe(iamMockTenantAccountData[0]);
        });
    });
});

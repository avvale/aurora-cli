/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateTenantByIdInput } from '@api/graphql';
import {
    IamUpdateTenantByIdHandler,
    IamUpdateTenantByIdResolver,
} from '@api/iam/tenant';
import { iamMockTenantData } from '@app/iam/tenant';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateTenantByIdResolver', () => {
    let resolver: IamUpdateTenantByIdResolver;
    let handler: IamUpdateTenantByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamUpdateTenantByIdResolver,
                {
                    provide: IamUpdateTenantByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamUpdateTenantByIdResolver>(
            IamUpdateTenantByIdResolver,
        );
        handler = module.get<IamUpdateTenantByIdHandler>(
            IamUpdateTenantByIdHandler,
        );
    });

    test('IamUpdateTenantByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamUpdateTenantByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a tenant by id updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockTenantData[0])),
            );
            expect(
                await resolver.main(
                    <IamUpdateTenantByIdInput>iamMockTenantData[0],
                ),
            ).toBe(iamMockTenantData[0]);
        });
    });
});

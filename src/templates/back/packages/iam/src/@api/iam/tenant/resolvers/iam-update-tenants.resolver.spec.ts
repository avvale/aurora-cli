/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateTenantsInput } from '@api/graphql';
import {
    IamUpdateTenantsHandler,
    IamUpdateTenantsResolver,
} from '@api/iam/tenant';
import { iamMockTenantData } from '@app/iam/tenant';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateTenantsResolver', () => {
    let resolver: IamUpdateTenantsResolver;
    let handler: IamUpdateTenantsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamUpdateTenantsResolver,
                {
                    provide: IamUpdateTenantsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamUpdateTenantsResolver>(
            IamUpdateTenantsResolver,
        );
        handler = module.get<IamUpdateTenantsHandler>(IamUpdateTenantsHandler);
    });

    test('IamUpdateTenantsResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamUpdateTenantsResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a tenants updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockTenantData[0])),
            );
            expect(
                await resolver.main(
                    <IamUpdateTenantsInput>iamMockTenantData[0],
                ),
            ).toBe(iamMockTenantData[0]);
        });
    });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdatePermissionByIdInput } from '@api/graphql';
import {
    IamUpdatePermissionByIdHandler,
    IamUpdatePermissionByIdResolver,
} from '@api/iam/permission';
import { iamMockPermissionData } from '@app/iam/permission';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdatePermissionByIdResolver', () => {
    let resolver: IamUpdatePermissionByIdResolver;
    let handler: IamUpdatePermissionByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamUpdatePermissionByIdResolver,
                {
                    provide: IamUpdatePermissionByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamUpdatePermissionByIdResolver>(
            IamUpdatePermissionByIdResolver,
        );
        handler = module.get<IamUpdatePermissionByIdHandler>(
            IamUpdatePermissionByIdHandler,
        );
    });

    test('IamUpdatePermissionByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamUpdatePermissionByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a permission by id updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(iamMockPermissionData[0])),
            );
            expect(
                await resolver.main(
                    <IamUpdatePermissionByIdInput>iamMockPermissionData[0],
                ),
            ).toBe(iamMockPermissionData[0]);
        });
    });
});

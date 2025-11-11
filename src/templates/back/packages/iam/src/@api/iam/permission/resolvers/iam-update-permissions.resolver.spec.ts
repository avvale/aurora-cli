/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdatePermissionsInput } from '@api/graphql';
import {
    IamUpdatePermissionsHandler,
    IamUpdatePermissionsResolver,
} from '@api/iam/permission';
import { iamMockPermissionData } from '@app/iam/permission';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdatePermissionsResolver', () => {
    let resolver: IamUpdatePermissionsResolver;
    let handler: IamUpdatePermissionsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamUpdatePermissionsResolver,
                {
                    provide: IamUpdatePermissionsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamUpdatePermissionsResolver>(
            IamUpdatePermissionsResolver,
        );
        handler = module.get<IamUpdatePermissionsHandler>(
            IamUpdatePermissionsHandler,
        );
    });

    test('IamUpdatePermissionsResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamUpdatePermissionsResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a permissions updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(iamMockPermissionData[0])),
            );
            expect(
                await resolver.main(
                    <IamUpdatePermissionsInput>iamMockPermissionData[0],
                ),
            ).toBe(iamMockPermissionData[0]);
        });
    });
});

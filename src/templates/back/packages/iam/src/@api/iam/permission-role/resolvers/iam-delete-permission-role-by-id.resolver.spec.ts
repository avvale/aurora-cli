/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamDeletePermissionRoleByIdHandler,
    IamDeletePermissionRoleByIdResolver,
} from '@api/iam/permission-role';
import { iamMockPermissionRoleData } from '@app/iam/permission-role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeletePermissionRoleByIdResolver', () => {
    let resolver: IamDeletePermissionRoleByIdResolver;
    let handler: IamDeletePermissionRoleByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamDeletePermissionRoleByIdResolver,
                {
                    provide: IamDeletePermissionRoleByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamDeletePermissionRoleByIdResolver>(
            IamDeletePermissionRoleByIdResolver,
        );
        handler = module.get<IamDeletePermissionRoleByIdHandler>(
            IamDeletePermissionRoleByIdHandler,
        );
    });

    test('IamDeletePermissionRoleByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamDeletePermissionRoleByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an permissionRole deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(iamMockPermissionRoleData[0]),
                    ),
            );
            expect(await resolver.main(iamMockPermissionRoleData[0].id)).toBe(
                iamMockPermissionRoleData[0],
            );
        });
    });
});

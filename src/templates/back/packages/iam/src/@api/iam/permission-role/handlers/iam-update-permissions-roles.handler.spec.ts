/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdatePermissionsRolesInput } from '@api/graphql';
import { IamUpdatePermissionsRolesHandler } from '@api/iam/permission-role';
import { iamMockPermissionRoleData } from '@app/iam/permission-role';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdatePermissionsRolesHandler', () => {
    let handler: IamUpdatePermissionsRolesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamUpdatePermissionsRolesHandler,
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {
                            /**/
                        },
                    },
                },
                {
                    provide: ICommandBus,
                    useValue: {
                        dispatch: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        handler = module.get<IamUpdatePermissionsRolesHandler>(
            IamUpdatePermissionsRolesHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamUpdatePermissionsRolesHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('IamUpdatePermissionsRolesHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a permissionsRoles updated', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(iamMockPermissionRoleData[0]),
                    ),
            );
            expect(
                await handler.main(
                    <IamUpdatePermissionsRolesInput>(
                        iamMockPermissionRoleData[0]
                    ),
                    {},
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(iamMockPermissionRoleData[0]);
        });
    });
});

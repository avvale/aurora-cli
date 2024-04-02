/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamIPermissionRoleRepository, iamMockPermissionRoleData, IamMockPermissionRoleRepository } from '@app/iam/permission-role';
import { IamUpdateAndIncrementPermissionsRolesService } from '@app/iam/permission-role/application/update/iam-update-and-increment-permissions-roles.service';
import {
    IamPermissionRolePermissionId,
    IamPermissionRoleRoleId,
} from '@app/iam/permission-role/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateAndIncrementPermissionsRolesService', () =>
{
    let service: IamUpdateAndIncrementPermissionsRolesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamUpdateAndIncrementPermissionsRolesService,
                IamMockPermissionRoleRepository,
                {
                    provide : IamIPermissionRoleRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamUpdateAndIncrementPermissionsRolesService);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementPermissionsRolesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a permissionsRoles and emit event', async () =>
        {
            /* eslint-disable key-spacing */
            expect(
                await service.main(
                    {
                        permissionId: new IamPermissionRolePermissionId(iamMockPermissionRoleData[0].permissionId),
                        roleId: new IamPermissionRoleRoleId(iamMockPermissionRoleData[0].roleId),
                    },
                    {},
                    {},
                ),
            )
                .toBe(undefined);
            /* eslint-enable key-spacing */
        });
    });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamIPermissionRoleRepository,
    iamMockPermissionRoleData,
    IamMockPermissionRoleRepository,
} from '@app/iam/permission-role';
import { IamUpdatePermissionRoleByIdService } from '@app/iam/permission-role/application/update/iam-update-permission-role-by-id.service';
import {
    IamPermissionRolePermissionId,
    IamPermissionRoleRoleId,
} from '@app/iam/permission-role/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdatePermissionRoleByIdService', () => {
    let service: IamUpdatePermissionRoleByIdService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamUpdatePermissionRoleByIdService,
                IamMockPermissionRoleRepository,
                {
                    provide: IamIPermissionRoleRepository,
                    useValue: {
                        updateById: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(IamUpdatePermissionRoleByIdService);
    });

    describe('main', () => {
        test('IamUpdatePermissionRoleByIdService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should update a permissionRole and emit event', async () => {
            expect(
                await service.main(
                    {
                        permissionId: new IamPermissionRolePermissionId(
                            iamMockPermissionRoleData[0].permissionId,
                        ),
                        roleId: new IamPermissionRoleRoleId(
                            iamMockPermissionRoleData[0].roleId,
                        ),
                    },
                    {},
                ),
            ).toBe(undefined);
        });
    });
});

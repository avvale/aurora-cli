/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamIPermissionRepository,
    iamMockPermissionData,
    IamMockPermissionRepository,
} from '@app/iam/permission';
import { IamUpdatePermissionsService } from '@app/iam/permission/application/update/iam-update-permissions.service';
import {
    IamPermissionBoundedContextId,
    IamPermissionId,
    IamPermissionName,
    IamPermissionRoleIds,
    IamPermissionRowId,
} from '@app/iam/permission/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdatePermissionsService', () => {
    let service: IamUpdatePermissionsService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamUpdatePermissionsService,
                IamMockPermissionRepository,
                {
                    provide: IamIPermissionRepository,
                    useValue: {
                        update: () => {
                            /**/
                        },
                        get: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(IamUpdatePermissionsService);
    });

    describe('main', () => {
        test('UpdatePermissionsService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should update a permissions and emit event', async () => {
            expect(
                await service.main(
                    {
                        id: new IamPermissionId(iamMockPermissionData[0].id),
                        rowId: new IamPermissionRowId(
                            iamMockPermissionData[0].rowId,
                        ),
                        name: new IamPermissionName(
                            iamMockPermissionData[0].name,
                        ),
                        boundedContextId: new IamPermissionBoundedContextId(
                            iamMockPermissionData[0].boundedContextId,
                        ),
                        roleIds: new IamPermissionRoleIds(
                            iamMockPermissionData[0].roleIds,
                        ),
                    },
                    {},
                    {},
                ),
            ).toBe(undefined);
        });
    });
});

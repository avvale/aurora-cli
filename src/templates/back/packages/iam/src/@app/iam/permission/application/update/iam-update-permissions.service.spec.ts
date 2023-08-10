/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { iamMockPermissionData } from '@app/iam/permission/infrastructure/mock/iam-mock-permission.data';
import { IamUpdatePermissionsService } from './iam-update-permissions.service';
import {
    IamPermissionId,
    IamPermissionName,
    IamPermissionBoundedContextId,
    IamPermissionRoleIds,
    IamPermissionCreatedAt,
    IamPermissionUpdatedAt,
    IamPermissionDeletedAt,
} from '../../domain/value-objects';
import { IamIPermissionRepository } from '../../domain/iam-permission.repository';
import { IamMockPermissionRepository } from '../../infrastructure/mock/iam-mock-permission.repository';

describe('IamUpdatePermissionsService', () =>
{
    let service: IamUpdatePermissionsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamUpdatePermissionsService,
                IamMockPermissionRepository,
                {
                    provide : IamIPermissionRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamUpdatePermissionsService);
    });

    describe('main', () =>
    {
        test('UpdatePermissionsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a permissions and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new IamPermissionId(iamMockPermissionData[0].id),
                        name: new IamPermissionName(iamMockPermissionData[0].name),
                        boundedContextId: new IamPermissionBoundedContextId(iamMockPermissionData[0].boundedContextId),
                        roleIds: new IamPermissionRoleIds(iamMockPermissionData[0].roleIds),
                    },
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});

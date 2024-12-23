/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamIPermissionRepository, iamMockPermissionData, IamMockPermissionRepository } from '@app/iam/permission';
import { IamUpdateAndIncrementPermissionsService } from '@app/iam/permission/application/update/iam-update-and-increment-permissions.service';
import {
    IamPermissionBoundedContextId,
    IamPermissionId,
    IamPermissionName,
    IamPermissionRoleIds,
} from '@app/iam/permission/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateAndIncrementPermissionsService', () =>
{
    let service: IamUpdateAndIncrementPermissionsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamUpdateAndIncrementPermissionsService,
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

        service = module.get(IamUpdateAndIncrementPermissionsService);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementPermissionsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a permissions and emit event', async () =>
        {
            /* eslint-disable key-spacing */
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
            /* eslint-enable key-spacing */
        });
    });
});

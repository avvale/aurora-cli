/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamIPermissionRepository, iamMockPermissionData, IamMockPermissionRepository } from '@app/iam/permission';
import { IamCreatePermissionService } from '@app/iam/permission/application/create/iam-create-permission.service';
import {
    IamPermissionBoundedContextId,
    IamPermissionId,
    IamPermissionName,
    IamPermissionRoleIds,
} from '@app/iam/permission/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreatePermissionService', () =>

{
    let service: IamCreatePermissionService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamCreatePermissionService,
                IamMockPermissionRepository,
                {
                    provide : IamIPermissionRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamCreatePermissionService);
    });

    describe('main', () =>
    {
        test('IamCreatePermissionService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a permission and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new IamPermissionId(iamMockPermissionData[0].id),
                        name: new IamPermissionName(iamMockPermissionData[0].name),
                        boundedContextId: new IamPermissionBoundedContextId(iamMockPermissionData[0].boundedContextId),
                        roleIds: new IamPermissionRoleIds(iamMockPermissionData[0].roleIds),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});

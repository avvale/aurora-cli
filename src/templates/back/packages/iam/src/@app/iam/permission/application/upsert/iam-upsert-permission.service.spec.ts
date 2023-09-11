/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamIPermissionRepository, iamMockPermissionData, IamMockPermissionRepository } from '@app/iam/permission';
import { IamUpsertPermissionService } from '@app/iam/permission/application/upsert/iam-upsert-permission.service';
import {
    IamPermissionBoundedContextId,
    IamPermissionId,
    IamPermissionName,
    IamPermissionRoleIds,
} from '@app/iam/permission/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertPermissionService', () =>

{
    let service: IamUpsertPermissionService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamUpsertPermissionService,
                IamMockPermissionRepository,
                {
                    provide : IamIPermissionRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamUpsertPermissionService);
    });

    describe('main', () =>
    {
        test('IamUpsertPermissionService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a permission and emit event', async () =>
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

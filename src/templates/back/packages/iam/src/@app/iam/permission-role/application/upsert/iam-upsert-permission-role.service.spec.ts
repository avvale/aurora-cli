/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamIPermissionRoleRepository, iamMockPermissionRoleData, IamMockPermissionRoleRepository } from '@app/iam/permission-role';
import { IamUpsertPermissionRoleService } from '@app/iam/permission-role/application/upsert/iam-upsert-permission-role.service';
import {
    IamPermissionRolePermissionId,
    IamPermissionRoleRoleId,
} from '@app/iam/permission-role/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertPermissionRoleService', () =>

{
    let service: IamUpsertPermissionRoleService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamUpsertPermissionRoleService,
                IamMockPermissionRoleRepository,
                {
                    provide : IamIPermissionRoleRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamUpsertPermissionRoleService);
    });

    describe('main', () =>
    {
        test('IamUpsertPermissionRoleService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a permissionRole and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        permissionId: new IamPermissionRolePermissionId(iamMockPermissionRoleData[0].permissionId),
                        roleId: new IamPermissionRoleRoleId(iamMockPermissionRoleData[0].roleId),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});

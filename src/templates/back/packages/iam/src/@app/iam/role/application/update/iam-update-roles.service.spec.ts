/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamIRoleRepository, iamMockRoleData, IamMockRoleRepository } from '@app/iam/role';
import { IamUpdateRolesService } from '@app/iam/role/application/update/iam-update-roles.service';
import {
    IamRoleAccountIds,
    IamRoleId,
    IamRoleIsMaster,
    IamRoleName,
    IamRolePermissionIds,
} from '@app/iam/role/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateRolesService', () =>
{
    let service: IamUpdateRolesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamUpdateRolesService,
                IamMockRoleRepository,
                {
                    provide : IamIRoleRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamUpdateRolesService);
    });

    describe('main', () =>
    {
        test('UpdateRolesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a roles and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new IamRoleId(iamMockRoleData[0].id),
                        name: new IamRoleName(iamMockRoleData[0].name),
                        isMaster: new IamRoleIsMaster(iamMockRoleData[0].isMaster),
                        permissionIds: new IamRolePermissionIds(iamMockRoleData[0].permissionIds),
                        accountIds: new IamRoleAccountIds(iamMockRoleData[0].accountIds),
                    },
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});

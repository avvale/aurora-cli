/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamIRoleRepository, iamMockRoleData, IamMockRoleRepository } from '@app/iam/role';
import { IamUpsertRoleService } from '@app/iam/role/application/upsert/iam-upsert-role.service';
import {
    IamRoleAccountIds,
    IamRoleId,
    IamRoleIsMaster,
    IamRoleName,
    IamRolePermissionIds,
} from '@app/iam/role/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertRoleService', () =>

{
    let service: IamUpsertRoleService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamUpsertRoleService,
                IamMockRoleRepository,
                {
                    provide : IamIRoleRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamUpsertRoleService);
    });

    describe('main', () =>
    {
        test('IamUpsertRoleService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a role and emit event', async () =>
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
                ),
            )
                .toBe(undefined);
        });
    });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { iamMockRoleData } from '@app/iam/role/infrastructure/mock/iam-mock-role.data';
import { IamCreateRoleService } from './iam-create-role.service';
import {
    IamRoleId,
    IamRoleName,
    IamRoleIsMaster,
    IamRolePermissionIds,
    IamRoleAccountIds,
    IamRoleCreatedAt,
    IamRoleUpdatedAt,
    IamRoleDeletedAt,
} from '../../domain/value-objects';
import { IamIRoleRepository } from '../../domain/iam-role.repository';
import { IamMockRoleRepository } from '../../infrastructure/mock/iam-mock-role.repository';

describe('IamCreateRoleService', () =>

{
    let service: IamCreateRoleService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamCreateRoleService,
                IamMockRoleRepository,
                {
                    provide : IamIRoleRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamCreateRoleService);
    });

    describe('main', () =>
    {
        test('IamCreateRoleService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a role and emit event', async () =>
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

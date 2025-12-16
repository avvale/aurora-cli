/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamIRoleRepository,
    iamMockRoleData,
    IamMockRoleRepository,
} from '@app/iam/role';
import { IamCreateRoleService } from '@app/iam/role/application/create/iam-create-role.service';
import {
    IamRoleAccountIds,
    IamRoleDefaultRedirection,
    IamRoleId,
    IamRoleIsMaster,
    IamRoleName,
    IamRolePermissionIds,
    IamRoleRowId,
} from '@app/iam/role/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateRoleService', () => {
    let service: IamCreateRoleService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamCreateRoleService,
                IamMockRoleRepository,
                {
                    provide: IamIRoleRepository,
                    useValue: {
                        create: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(IamCreateRoleService);
    });

    describe('main', () => {
        test('IamCreateRoleService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should create a role and emit event', async () => {
            expect(
                await service.main({
                    id: new IamRoleId(iamMockRoleData[0].id),
                    rowId: new IamRoleRowId(iamMockRoleData[0].rowId),
                    name: new IamRoleName(iamMockRoleData[0].name),
                    defaultRedirection: new IamRoleDefaultRedirection(
                        iamMockRoleData[0].defaultRedirection,
                    ),
                    isMaster: new IamRoleIsMaster(iamMockRoleData[0].isMaster),
                    permissionIds: new IamRolePermissionIds(
                        iamMockRoleData[0].permissionIds,
                    ),
                    accountIds: new IamRoleAccountIds(
                        iamMockRoleData[0].accountIds,
                    ),
                }),
            ).toBe(undefined);
        });
    });
});

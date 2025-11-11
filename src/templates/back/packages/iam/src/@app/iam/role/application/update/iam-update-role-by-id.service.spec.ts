/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamIRoleRepository,
    iamMockRoleData,
    IamMockRoleRepository,
} from '@app/iam/role';
import { IamUpdateRoleByIdService } from '@app/iam/role/application/update/iam-update-role-by-id.service';
import {
    IamRoleAccountIds,
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

describe('IamUpdateRoleByIdService', () => {
    let service: IamUpdateRoleByIdService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamUpdateRoleByIdService,
                IamMockRoleRepository,
                {
                    provide: IamIRoleRepository,
                    useValue: {
                        updateById: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(IamUpdateRoleByIdService);
    });

    describe('main', () => {
        test('IamUpdateRoleByIdService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should update a role and emit event', async () => {
            expect(
                await service.main(
                    {
                        id: new IamRoleId(iamMockRoleData[0].id),
                        rowId: new IamRoleRowId(iamMockRoleData[0].rowId),
                        name: new IamRoleName(iamMockRoleData[0].name),
                        isMaster: new IamRoleIsMaster(
                            iamMockRoleData[0].isMaster,
                        ),
                        permissionIds: new IamRolePermissionIds(
                            iamMockRoleData[0].permissionIds,
                        ),
                        accountIds: new IamRoleAccountIds(
                            iamMockRoleData[0].accountIds,
                        ),
                    },
                    {},
                ),
            ).toBe(undefined);
        });
    });
});

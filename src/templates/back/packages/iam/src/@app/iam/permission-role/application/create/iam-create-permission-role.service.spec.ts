/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamIPermissionRoleRepository,
    iamMockPermissionRoleData,
    IamMockPermissionRoleRepository,
} from '@app/iam/permission-role';
import { IamCreatePermissionRoleService } from '@app/iam/permission-role/application/create/iam-create-permission-role.service';
import {
    IamPermissionRolePermissionId,
    IamPermissionRoleRoleId,
} from '@app/iam/permission-role/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreatePermissionRoleService', () => {
    let service: IamCreatePermissionRoleService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamCreatePermissionRoleService,
                IamMockPermissionRoleRepository,
                {
                    provide: IamIPermissionRoleRepository,
                    useValue: {
                        create: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(IamCreatePermissionRoleService);
    });

    describe('main', () => {
        test('IamCreatePermissionRoleService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should create a permissionRole and emit event', async () => {
            expect(
                await service.main({
                    permissionId: new IamPermissionRolePermissionId(
                        iamMockPermissionRoleData[0].permissionId,
                    ),
                    roleId: new IamPermissionRoleRoleId(
                        iamMockPermissionRoleData[0].roleId,
                    ),
                }),
            ).toBe(undefined);
        });
    });
});

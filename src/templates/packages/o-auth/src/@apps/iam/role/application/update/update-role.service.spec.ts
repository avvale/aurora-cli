/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { rolesToCreate as roles } from '../../../../../@apps/iam/role/infrastructure/seeds/roles-to-create.seed';
import { UpdateRoleService } from './update-role.service';
import {
    RoleId,
    RoleName,
    RoleIsMaster,
    RolePermissionIds,
    RoleAccountIds,
    RoleCreatedAt,
    RoleUpdatedAt,
    RoleDeletedAt,
} from '../../domain/value-objects';
import { IRoleRepository } from '../../domain/role.repository';
import { MockRoleRepository } from '../../infrastructure/mock/mock-role.repository';

describe('UpdateRoleService', () =>
{
    let service: UpdateRoleService;
    let repository: IRoleRepository;
    let mockRepository: MockRoleRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateRoleService,
                MockRoleRepository,
                {
                    provide: IRoleRepository,
                    useValue: {
                        update: (item) => { /**/ }
                    }
                },
            ]
        }).compile();

        service         = module.get(UpdateRoleService);
        repository      = module.get(IRoleRepository);
        mockRepository  = module.get(MockRoleRepository);
    });

    describe('main', () =>
    {
        test('UpdateRoleService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a role and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new RoleId(roles[0].id),
                    name: new RoleName(roles[0].name),
                    isMaster: new RoleIsMaster(roles[0].isMaster),
                    permissionIds: new RolePermissionIds(roles[0].permissionIds),
                    accountIds: new RoleAccountIds(roles[0].accountIds),
                }
            )).toBe(undefined);
        });
    });
});
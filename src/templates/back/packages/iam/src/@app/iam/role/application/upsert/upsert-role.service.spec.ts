/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { roles } from '@app/iam/role/infrastructure/seeds/role.seed';
import { UpsertRoleService } from './upsert-role.service';
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

describe('UpsertRoleService', () =>

{
    let service: UpsertRoleService;
    let repository: IRoleRepository;
    let mockRepository: MockRoleRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpsertRoleService,
                MockRoleRepository,
                {
                    provide : IRoleRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(UpsertRoleService);
        repository      = module.get(IRoleRepository);
        mockRepository  = module.get(MockRoleRepository);
    });

    describe('main', () =>
    {
        test('UpsertRoleService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a role and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new RoleId(roles[0].id),
                    name: new RoleName(roles[0].name),
                    isMaster: new RoleIsMaster(roles[0].isMaster),
                    permissionIds: new RolePermissionIds(roles[0].permissionIds),
                    accountIds: new RoleAccountIds(roles[0].accountIds),
                },
            )).toBe(undefined);
        });
    });
});
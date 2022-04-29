/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { rolesToCreate as roles } from '../../../../../@apps/iam/role/infrastructure/seeds/roles-to-create.seed';
import { CreateRoleService } from './create-role.service';
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

describe('CreateRoleService', () =>

{
    let service: CreateRoleService;
    let repository: IRoleRepository;
    let mockRepository: MockRoleRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateRoleService,
                MockRoleRepository,
                {
                    provide : IRoleRepository,
                    useValue: {
                        create: (item) => { /**/ },
                    },
                },
            ],
        }).compile();

        service         = module.get(CreateRoleService);
        repository      = module.get(IRoleRepository);
        mockRepository  = module.get(MockRoleRepository);
    });

    describe('main', () =>
    {
        test('CreateRoleService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a role and emit event', async () =>
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
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { permissions } from '@app/iam/permission/infrastructure/mock/mock-permission.data';
import { UpsertPermissionService } from './upsert-permission.service';
import {
    PermissionId,
    PermissionName,
    PermissionBoundedContextId,
    PermissionRoleIds,
    PermissionCreatedAt,
    PermissionUpdatedAt,
    PermissionDeletedAt,
} from '../../domain/value-objects';
import { IPermissionRepository } from '../../domain/permission.repository';
import { MockPermissionRepository } from '../../infrastructure/mock/mock-permission.repository';

describe('UpsertPermissionService', () =>

{
    let service: UpsertPermissionService;
    let repository: IPermissionRepository;
    let mockRepository: MockPermissionRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpsertPermissionService,
                MockPermissionRepository,
                {
                    provide : IPermissionRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(UpsertPermissionService);
        repository      = module.get(IPermissionRepository);
        mockRepository  = module.get(MockPermissionRepository);
    });

    describe('main', () =>
    {
        test('UpsertPermissionService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a permission and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new PermissionId(permissions[0].id),
                    name: new PermissionName(permissions[0].name),
                    boundedContextId: new PermissionBoundedContextId(permissions[0].boundedContextId),
                    roleIds: new PermissionRoleIds(permissions[0].roleIds),
                },
            )).toBe(undefined);
        });
    });
});
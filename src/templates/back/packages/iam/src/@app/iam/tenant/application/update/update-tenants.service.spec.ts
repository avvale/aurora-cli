/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { tenants } from '@app/iam/tenant/infrastructure/seeds/tenant.seed';
import { UpdateTenantsService } from './update-tenants.service';
import {
    TenantId,
    TenantName,
    TenantCode,
    TenantLogo,
    TenantIsActive,
    TenantMeta,
    TenantAccountIds,
    TenantCreatedAt,
    TenantUpdatedAt,
    TenantDeletedAt,
} from '../../domain/value-objects';
import { ITenantRepository } from '../../domain/tenant.repository';
import { MockTenantRepository } from '../../infrastructure/mock/mock-tenant.repository';

describe('UpdateTenantsService', () =>
{
    let service: UpdateTenantsService;
    let repository: ITenantRepository;
    let mockRepository: MockTenantRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateTenantsService,
                MockTenantRepository,
                {
                    provide : ITenantRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(UpdateTenantsService);
        repository      = module.get(ITenantRepository);
        mockRepository  = module.get(MockTenantRepository);
    });

    describe('main', () =>
    {
        test('UpdateTenantsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a tenants and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new TenantId(tenants[0].id),
                    name: new TenantName(tenants[0].name),
                    code: new TenantCode(tenants[0].code),
                    logo: new TenantLogo(tenants[0].logo),
                    isActive: new TenantIsActive(tenants[0].isActive),
                    meta: new TenantMeta(tenants[0].meta),
                    accountIds: new TenantAccountIds(tenants[0].accountIds),
                },
            )).toBe(undefined);
        });
    });
});
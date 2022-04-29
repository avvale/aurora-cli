/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { tenants } from '../../../../../@apps/iam/tenant/infrastructure/seeds/tenant.seed';
import { CreateTenantService } from './create-tenant.service';
import {
    TenantId,
    TenantName,
    TenantCode,
    TenantLogo,
    TenantIsActive,
    TenantData,
    TenantAccountIds,
    TenantCreatedAt,
    TenantUpdatedAt,
    TenantDeletedAt,
} from '../../domain/value-objects';
import { ITenantRepository } from '../../domain/tenant.repository';
import { MockTenantRepository } from '../../infrastructure/mock/mock-tenant.repository';

describe('CreateTenantService', () =>

{
    let service: CreateTenantService;
    let repository: ITenantRepository;
    let mockRepository: MockTenantRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateTenantService,
                MockTenantRepository,
                {
                    provide : ITenantRepository,
                    useValue: {
                        create: (item) => { /**/ },
                    },
                },
            ],
        }).compile();

        service         = module.get(CreateTenantService);
        repository      = module.get(ITenantRepository);
        mockRepository  = module.get(MockTenantRepository);
    });

    describe('main', () =>
    {
        test('CreateTenantService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a tenant and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new TenantId(tenants[0].id),
                    name: new TenantName(tenants[0].name),
                    code: new TenantCode(tenants[0].code),
                    logo: new TenantLogo(tenants[0].logo),
                    isActive: new TenantIsActive(tenants[0].isActive),
                    data: new TenantData(tenants[0].data),
                    accountIds: new TenantAccountIds(tenants[0].accountIds),
                },
            )).toBe(undefined);
        });
    });
});
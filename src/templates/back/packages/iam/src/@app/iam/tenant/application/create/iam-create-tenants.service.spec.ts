/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { IamCreateTenantsService } from './iam-create-tenants.service';
import { IamITenantRepository } from '../../domain/iam-tenant.repository';
import { IamMockTenantRepository } from '../../infrastructure/mock/iam-mock-tenant.repository';

describe('IamCreateTenantsService', () =>
{
    let service: IamCreateTenantsService;
    let mockRepository: IamMockTenantRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamCreateTenantsService,
                IamMockTenantRepository,
                {
                    provide : IamITenantRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamCreateTenantsService);
        mockRepository = module.get(IamMockTenantRepository);
    });

    describe('main', () =>
    {
        test('CreateTenantsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create tenants and emit event', async () =>
        {
            expect(
                await service.main(
                    mockRepository.collectionSource,
                ),
            )
                .toBe(undefined);
        });
    });
});

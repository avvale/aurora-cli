/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamITenantRepository, IamMockTenantRepository } from '@app/iam/tenant';
import { IamCreateTenantsService } from '@app/iam/tenant/application/create/iam-create-tenants.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateTenantsService', () => {
    let service: IamCreateTenantsService;
    let mockRepository: IamMockTenantRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamCreateTenantsService,
                IamMockTenantRepository,
                {
                    provide: IamITenantRepository,
                    useValue: {
                        insert: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(IamCreateTenantsService);
        mockRepository = module.get(IamMockTenantRepository);
    });

    describe('main', () => {
        test('CreateTenantsService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should create tenants and emit event', async () => {
            expect(await service.main(mockRepository.collectionSource)).toBe(
                undefined,
            );
        });
    });
});

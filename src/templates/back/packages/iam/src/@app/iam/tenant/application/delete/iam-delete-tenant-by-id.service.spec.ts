/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamITenantRepository, iamMockTenantData, IamMockTenantRepository } from '@app/iam/tenant';
import { IamDeleteTenantByIdService } from '@app/iam/tenant/application/delete/iam-delete-tenant-by-id.service';
import { IamTenantId } from '@app/iam/tenant/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteTenantByIdService', () =>
{
    let service: IamDeleteTenantByIdService;
    let repository: IamITenantRepository;
    let mockRepository: IamMockTenantRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamDeleteTenantByIdService,
                IamMockTenantRepository,
                {
                    provide : IamITenantRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamDeleteTenantByIdService);
        repository = module.get(IamITenantRepository);
        mockRepository = module.get(IamMockTenantRepository);
    });

    describe('main', () =>
    {
        test('IamDeleteTenantByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete tenant and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new IamTenantId(iamMockTenantData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});

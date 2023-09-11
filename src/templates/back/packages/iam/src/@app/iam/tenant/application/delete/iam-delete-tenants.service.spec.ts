/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamITenantRepository, IamMockTenantRepository } from '@app/iam/tenant';
import { IamDeleteTenantsService } from '@app/iam/tenant/application/delete/iam-delete-tenants.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteTenantsService', () =>
{
    let service: IamDeleteTenantsService;
    let repository: IamITenantRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamDeleteTenantsService,
                IamMockTenantRepository,
                {
                    provide : IamITenantRepository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamDeleteTenantsService);
        repository = module.get(IamITenantRepository);
    });

    describe('main', () =>
    {
        test('IamDeleteTenantsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete tenant and emit event', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(
                await service.main(
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamITenantAccountRepository, IamMockTenantAccountRepository } from '@app/iam/tenant-account';
import { IamDeleteTenantsAccountsService } from '@app/iam/tenant-account/application/delete/iam-delete-tenants-accounts.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteTenantsAccountsService', () =>
{
    let service: IamDeleteTenantsAccountsService;
    let repository: IamITenantAccountRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamDeleteTenantsAccountsService,
                IamMockTenantAccountRepository,
                {
                    provide : IamITenantAccountRepository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamDeleteTenantsAccountsService);
        repository = module.get(IamITenantAccountRepository);
    });

    describe('main', () =>
    {
        test('IamDeleteTenantsAccountsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete tenantAccount and emit event', async () =>
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

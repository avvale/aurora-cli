/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamITenantRepository, iamMockTenantData, IamMockTenantRepository } from '@app/iam/tenant';
import { IamUpdateAndIncrementTenantsService } from '@app/iam/tenant/application/update/iam-update-and-increment-tenants.service';
import {
    IamTenantAccountIds,
    IamTenantCode,
    IamTenantId,
    IamTenantIsActive,
    IamTenantLogo,
    IamTenantMeta,
    IamTenantName,
    IamTenantParentId,
} from '@app/iam/tenant/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateAndIncrementTenantsService', () =>
{
    let service: IamUpdateAndIncrementTenantsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamUpdateAndIncrementTenantsService,
                IamMockTenantRepository,
                {
                    provide : IamITenantRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamUpdateAndIncrementTenantsService);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementTenantsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a tenants and emit event', async () =>
        {
            /* eslint-disable key-spacing */
            expect(
                await service.main(
                    {
                        id: new IamTenantId(iamMockTenantData[0].id),
                        parentId: new IamTenantParentId(iamMockTenantData[0].parentId),
                        name: new IamTenantName(iamMockTenantData[0].name),
                        code: new IamTenantCode(iamMockTenantData[0].code),
                        logo: new IamTenantLogo(iamMockTenantData[0].logo),
                        isActive: new IamTenantIsActive(iamMockTenantData[0].isActive),
                        meta: new IamTenantMeta(iamMockTenantData[0].meta),
                        accountIds: new IamTenantAccountIds(iamMockTenantData[0].accountIds),
                    },
                    {},
                    {},
                ),
            )
                .toBe(undefined);
            /* eslint-enable key-spacing */
        });
    });
});

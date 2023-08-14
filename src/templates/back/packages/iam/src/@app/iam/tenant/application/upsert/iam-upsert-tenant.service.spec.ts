/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { iamMockTenantData } from '@app/iam/tenant/infrastructure/mock/iam-mock-tenant.data';
import { IamUpsertTenantService } from './iam-upsert-tenant.service';
import {
    IamTenantId,
    IamTenantName,
    IamTenantCode,
    IamTenantLogo,
    IamTenantIsActive,
    IamTenantMeta,
    IamTenantAccountIds,
    IamTenantCreatedAt,
    IamTenantUpdatedAt,
    IamTenantDeletedAt,
} from '../../domain/value-objects';
import { IamITenantRepository } from '../../domain/iam-tenant.repository';
import { IamMockTenantRepository } from '../../infrastructure/mock/iam-mock-tenant.repository';

describe('IamUpsertTenantService', () =>

{
    let service: IamUpsertTenantService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamUpsertTenantService,
                IamMockTenantRepository,
                {
                    provide : IamITenantRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamUpsertTenantService);
    });

    describe('main', () =>
    {
        test('IamUpsertTenantService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a tenant and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new IamTenantId(iamMockTenantData[0].id),
                        name: new IamTenantName(iamMockTenantData[0].name),
                        code: new IamTenantCode(iamMockTenantData[0].code),
                        logo: new IamTenantLogo(iamMockTenantData[0].logo),
                        isActive: new IamTenantIsActive(iamMockTenantData[0].isActive),
                        meta: new IamTenantMeta(iamMockTenantData[0].meta),
                        accountIds: new IamTenantAccountIds(iamMockTenantData[0].accountIds),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});

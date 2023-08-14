/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { commonMockResourceData } from '@app/common/resource/infrastructure/mock/common-mock-resource.data';
import { CommonUpdateResourceByIdService } from './common-update-resource-by-id.service';
import {
    CommonResourceId,
    CommonResourceCode,
    CommonResourceName,
    CommonResourceIsActive,
    CommonResourceHasAttachments,
    CommonResourceCreatedAt,
    CommonResourceUpdatedAt,
    CommonResourceDeletedAt,
} from '../../domain/value-objects';
import { CommonIResourceRepository } from '../../domain/common-resource.repository';
import { CommonMockResourceRepository } from '../../infrastructure/mock/common-mock-resource.repository';

describe('CommonUpdateResourceByIdService', () =>
{
    let service: CommonUpdateResourceByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonUpdateResourceByIdService,
                CommonMockResourceRepository,
                {
                    provide : CommonIResourceRepository,
                    useValue: {
                        updateById: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonUpdateResourceByIdService);
    });

    describe('main', () =>
    {
        test('CommonUpdateResourceByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a resource and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new CommonResourceId(commonMockResourceData[0].id),
                        code: new CommonResourceCode(commonMockResourceData[0].code),
                        name: new CommonResourceName(commonMockResourceData[0].name),
                        isActive: new CommonResourceIsActive(commonMockResourceData[0].isActive),
                        hasAttachments: new CommonResourceHasAttachments(commonMockResourceData[0].hasAttachments),
                    },
                    {},
                ),
            ).toBe(undefined);
        });
    });
});

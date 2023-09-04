/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonIResourceRepository, commonMockResourceData, CommonMockResourceRepository } from '@app/common/resource';
import { CommonUpdateResourceByIdService } from '@app/common/resource/application/update/common-update-resource-by-id.service';
import {
    CommonResourceCode,
    CommonResourceHasAttachments,
    CommonResourceId,
    CommonResourceIsActive,
    CommonResourceName,
} from '@app/common/resource/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

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

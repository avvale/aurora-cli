/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { commonMockResourceData } from '@app/common/resource/infrastructure/mock/common-mock-resource.data';
import { CommonUpdateResourcesService } from './common-update-resources.service';
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

describe('CommonUpdateResourcesService', () =>
{
    let service: CommonUpdateResourcesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonUpdateResourcesService,
                CommonMockResourceRepository,
                {
                    provide : CommonIResourceRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonUpdateResourcesService);
    });

    describe('main', () =>
    {
        test('UpdateResourcesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a resources and emit event', async () =>
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
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});

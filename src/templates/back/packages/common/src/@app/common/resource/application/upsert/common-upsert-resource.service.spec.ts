/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonIResourceRepository,
  commonMockResourceData,
  CommonMockResourceRepository,
} from '@app/common/resource';
import { CommonUpsertResourceService } from '@app/common/resource/application/upsert/common-upsert-resource.service';
import {
  CommonResourceCode,
  CommonResourceHasAttachments,
  CommonResourceId,
  CommonResourceIsActive,
  CommonResourceName,
} from '@app/common/resource/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpsertResourceService', () => {
  let service: CommonUpsertResourceService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonUpsertResourceService,
        CommonMockResourceRepository,
        {
          provide: CommonIResourceRepository,
          useValue: {
            upsert: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonUpsertResourceService);
  });

  describe('main', () => {
    test('CommonUpsertResourceService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should upsert a resource and emit event', async () => {
      expect(
        await service.main({
          id: new CommonResourceId(commonMockResourceData[0].id),
          code: new CommonResourceCode(commonMockResourceData[0].code),
          name: new CommonResourceName(commonMockResourceData[0].name),
          isActive: new CommonResourceIsActive(
            commonMockResourceData[0].isActive,
          ),
          hasAttachments: new CommonResourceHasAttachments(
            commonMockResourceData[0].hasAttachments,
          ),
        }),
      ).toBe(undefined);
    });
  });
});

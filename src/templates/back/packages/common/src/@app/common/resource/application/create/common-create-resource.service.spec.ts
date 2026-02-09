/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import {
  CommonIResourceRepository,
  commonMockResourceData,
  CommonMockResourceRepository,
} from '@app/common/resource';
import { CommonCreateResourceService } from '@app/common/resource/application/create/common-create-resource.service';
import {
  CommonResourceCode,
  CommonResourceHasAttachments,
  CommonResourceId,
  CommonResourceIsActive,
  CommonResourceName,
  CommonResourceRowId,
} from '@app/common/resource/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateResourceService', () => {
  let service: CommonCreateResourceService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonCreateResourceService,
        CommonMockResourceRepository,
        {
          provide: CommonIResourceRepository,
          useValue: {
            create: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonCreateResourceService);
  });

  describe('main', () => {
    test('CommonCreateResourceService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should create a resource and emit event', async () => {
      expect(
        await service.main({
          id: new CommonResourceId(commonMockResourceData[0].id),
          rowId: new CommonResourceRowId(commonMockResourceData[0].rowId),
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

/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import {
  IamIPermissionRepository,
  iamMockPermissionData,
  IamMockPermissionRepository,
} from '@app/iam/permission';
import { IamUpdatePermissionByIdService } from '@app/iam/permission/application/update/iam-update-permission-by-id.service';
import {
  IamPermissionBoundedContextId,
  IamPermissionId,
  IamPermissionName,
  IamPermissionRoleIds,
  IamPermissionRowId,
} from '@app/iam/permission/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdatePermissionByIdService', () => {
  let service: IamUpdatePermissionByIdService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        IamUpdatePermissionByIdService,
        IamMockPermissionRepository,
        {
          provide: IamIPermissionRepository,
          useValue: {
            updateById: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(IamUpdatePermissionByIdService);
  });

  describe('main', () => {
    test('IamUpdatePermissionByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should update a permission and emit event', async () => {
      expect(
        await service.main(
          {
            id: new IamPermissionId(iamMockPermissionData[0].id),
            rowId: new IamPermissionRowId(iamMockPermissionData[0].rowId),
            name: new IamPermissionName(iamMockPermissionData[0].name),
            boundedContextId: new IamPermissionBoundedContextId(
              iamMockPermissionData[0].boundedContextId,
            ),
            roleIds: new IamPermissionRoleIds(iamMockPermissionData[0].roleIds),
          },
          {},
        ),
      ).toBe(undefined);
    });
  });
});

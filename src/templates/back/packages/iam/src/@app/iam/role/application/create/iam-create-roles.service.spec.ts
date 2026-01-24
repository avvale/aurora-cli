/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamIRoleRepository, IamMockRoleRepository } from '@app/iam/role';
import { IamCreateRolesService } from '@app/iam/role/application/create/iam-create-roles.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateRolesService', () => {
  let service: IamCreateRolesService;
  let mockRepository: IamMockRoleRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        IamCreateRolesService,
        IamMockRoleRepository,
        {
          provide: IamIRoleRepository,
          useValue: {
            insert: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(IamCreateRolesService);
    mockRepository = module.get(IamMockRoleRepository);
  });

  describe('main', () => {
    test('CreateRolesService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should create roles and emit event', async () => {
      expect(await service.main(mockRepository.collectionSource)).toBe(
        undefined,
      );
    });
  });
});

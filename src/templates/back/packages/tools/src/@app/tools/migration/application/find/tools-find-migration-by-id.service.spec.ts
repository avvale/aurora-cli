import {
  ToolsIMigrationRepository,
  toolsMockMigrationData,
  ToolsMockMigrationRepository,
} from '@app/tools/migration';
import { ToolsFindMigrationByIdService } from '@app/tools/migration/application/find/tools-find-migration-by-id.service';
import { ToolsMigrationId } from '@app/tools/migration/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindMigrationByIdService', () => {
  let service: ToolsFindMigrationByIdService;
  let repository: ToolsIMigrationRepository;
  let mockRepository: ToolsMockMigrationRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        ToolsFindMigrationByIdService,
        ToolsMockMigrationRepository,
        {
          provide: ToolsIMigrationRepository,
          useValue: {
            findById: (id) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(ToolsFindMigrationByIdService);
    repository = module.get(ToolsIMigrationRepository);
    mockRepository = module.get(ToolsMockMigrationRepository);
  });

  describe('main', () => {
    test('FindMigrationByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find migration by id', async () => {
      jest
        .spyOn(repository, 'findById')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(
        await service.main(new ToolsMigrationId(toolsMockMigrationData[0].id)),
      ).toBe(mockRepository.collectionSource[0]);
    });
  });
});

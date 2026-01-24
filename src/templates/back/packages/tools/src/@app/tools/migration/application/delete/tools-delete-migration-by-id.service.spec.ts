/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ToolsIMigrationRepository,
  toolsMockMigrationData,
  ToolsMockMigrationRepository,
} from '@app/tools/migration';
import { ToolsDeleteMigrationByIdService } from '@app/tools/migration/application/delete/tools-delete-migration-by-id.service';
import { ToolsMigrationId } from '@app/tools/migration/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteMigrationByIdService', () => {
  let service: ToolsDeleteMigrationByIdService;
  let repository: ToolsIMigrationRepository;
  let mockRepository: ToolsMockMigrationRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        ToolsDeleteMigrationByIdService,
        ToolsMockMigrationRepository,
        {
          provide: ToolsIMigrationRepository,
          useValue: {
            deleteById: (id) => {
              /**/
            },
            findById: (id) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(ToolsDeleteMigrationByIdService);
    repository = module.get(ToolsIMigrationRepository);
    mockRepository = module.get(ToolsMockMigrationRepository);
  });

  describe('main', () => {
    test('ToolsDeleteMigrationByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should delete migration and emit event', async () => {
      jest
        .spyOn(repository, 'findById')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(
        await service.main(
          new ToolsMigrationId(toolsMockMigrationData[0].id),
          {},
        ),
      ).toBe(undefined);
    });
  });
});

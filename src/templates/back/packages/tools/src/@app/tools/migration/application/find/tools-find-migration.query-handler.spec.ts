import {
  ToolsFindMigrationQuery,
  ToolsIMigrationRepository,
  ToolsMigrationMapper,
  ToolsMockMigrationRepository,
} from '@app/tools/migration';
import { ToolsFindMigrationQueryHandler } from '@app/tools/migration/application/find/tools-find-migration.query-handler';
import { ToolsFindMigrationService } from '@app/tools/migration/application/find/tools-find-migration.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindMigrationQueryHandler', () => {
  let queryHandler: ToolsFindMigrationQueryHandler;
  let service: ToolsFindMigrationService;
  let repository: ToolsMockMigrationRepository;
  let mapper: ToolsMigrationMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToolsFindMigrationQueryHandler,
        {
          provide: ToolsIMigrationRepository,
          useClass: ToolsMockMigrationRepository,
        },
        {
          provide: ToolsFindMigrationService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<ToolsFindMigrationQueryHandler>(
      ToolsFindMigrationQueryHandler,
    );
    service = module.get<ToolsFindMigrationService>(ToolsFindMigrationService);
    repository = <ToolsMockMigrationRepository>(
      module.get<ToolsIMigrationRepository>(ToolsIMigrationRepository)
    );
    mapper = new ToolsMigrationMapper();
  });

  describe('main', () => {
    test('ToolsFindMigrationQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an migration founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(repository.collectionSource[0])),
        );
      expect(
        await queryHandler.execute(new ToolsFindMigrationQuery()),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});

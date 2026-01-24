import {
  ToolsFindKeyValueQuery,
  ToolsIKeyValueRepository,
  ToolsKeyValueMapper,
  ToolsMockKeyValueRepository,
} from '@app/tools/key-value';
import { ToolsFindKeyValueQueryHandler } from '@app/tools/key-value/application/find/tools-find-key-value.query-handler';
import { ToolsFindKeyValueService } from '@app/tools/key-value/application/find/tools-find-key-value.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindKeyValueQueryHandler', () => {
  let queryHandler: ToolsFindKeyValueQueryHandler;
  let service: ToolsFindKeyValueService;
  let repository: ToolsMockKeyValueRepository;
  let mapper: ToolsKeyValueMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToolsFindKeyValueQueryHandler,
        {
          provide: ToolsIKeyValueRepository,
          useClass: ToolsMockKeyValueRepository,
        },
        {
          provide: ToolsFindKeyValueService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<ToolsFindKeyValueQueryHandler>(
      ToolsFindKeyValueQueryHandler,
    );
    service = module.get<ToolsFindKeyValueService>(ToolsFindKeyValueService);
    repository = <ToolsMockKeyValueRepository>(
      module.get<ToolsIKeyValueRepository>(ToolsIKeyValueRepository)
    );
    mapper = new ToolsKeyValueMapper();
  });

  describe('main', () => {
    test('ToolsFindKeyValueQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an keyValue founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(repository.collectionSource[0])),
        );
      expect(
        await queryHandler.execute(new ToolsFindKeyValueQuery()),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});

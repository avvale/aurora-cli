import {
  ToolsFindKeyValueByIdQuery,
  ToolsIKeyValueRepository,
  ToolsKeyValueMapper,
  toolsMockKeyValueData,
  ToolsMockKeyValueRepository,
} from '@app/tools/key-value';
import { ToolsFindKeyValueByIdQueryHandler } from '@app/tools/key-value/application/find/tools-find-key-value-by-id.query-handler';
import { ToolsFindKeyValueByIdService } from '@app/tools/key-value/application/find/tools-find-key-value-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindKeyValueByIdQueryHandler', () => {
  let queryHandler: ToolsFindKeyValueByIdQueryHandler;
  let service: ToolsFindKeyValueByIdService;
  let repository: ToolsMockKeyValueRepository;
  let mapper: ToolsKeyValueMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToolsFindKeyValueByIdQueryHandler,
        {
          provide: ToolsIKeyValueRepository,
          useClass: ToolsMockKeyValueRepository,
        },
        {
          provide: ToolsFindKeyValueByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<ToolsFindKeyValueByIdQueryHandler>(
      ToolsFindKeyValueByIdQueryHandler,
    );
    service = module.get<ToolsFindKeyValueByIdService>(
      ToolsFindKeyValueByIdService,
    );
    repository = <ToolsMockKeyValueRepository>(
      module.get<ToolsIKeyValueRepository>(ToolsIKeyValueRepository)
    );
    mapper = new ToolsKeyValueMapper();
  });

  describe('main', () => {
    test('FindKeyValueByIdQueryHandler should be defined', () => {
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
        await queryHandler.execute(
          new ToolsFindKeyValueByIdQuery(toolsMockKeyValueData[0].id),
        ),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});

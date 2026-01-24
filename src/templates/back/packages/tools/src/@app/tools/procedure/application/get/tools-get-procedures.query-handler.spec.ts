import {
  ToolsGetProceduresQuery,
  ToolsIProcedureRepository,
  ToolsMockProcedureRepository,
  ToolsProcedureMapper,
} from '@app/tools/procedure';
import { ToolsGetProceduresQueryHandler } from '@app/tools/procedure/application/get/tools-get-procedures.query-handler';
import { ToolsGetProceduresService } from '@app/tools/procedure/application/get/tools-get-procedures.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetProceduresQueryHandler', () => {
  let queryHandler: ToolsGetProceduresQueryHandler;
  let service: ToolsGetProceduresService;
  let repository: ToolsMockProcedureRepository;
  let mapper: ToolsProcedureMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToolsGetProceduresQueryHandler,
        {
          provide: ToolsIProcedureRepository,
          useClass: ToolsMockProcedureRepository,
        },
        {
          provide: ToolsGetProceduresService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<ToolsGetProceduresQueryHandler>(
      ToolsGetProceduresQueryHandler,
    );
    service = module.get<ToolsGetProceduresService>(ToolsGetProceduresService);
    repository = <ToolsMockProcedureRepository>(
      module.get<ToolsIProcedureRepository>(ToolsIProcedureRepository)
    );
    mapper = new ToolsProcedureMapper();
  });

  describe('main', () => {
    test('ToolsGetProceduresQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an procedures founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(repository.collectionSource)),
        );
      expect(
        await queryHandler.execute(new ToolsGetProceduresQuery()),
      ).toStrictEqual(
        mapper.mapAggregatesToResponses(repository.collectionSource),
      );
    });
  });
});

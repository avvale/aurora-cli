import { ToolsFindProcedureQuery, ToolsIProcedureRepository, ToolsMockProcedureRepository, ToolsProcedureMapper } from '@app/tools/procedure';
import { ToolsFindProcedureQueryHandler } from '@app/tools/procedure/application/find/tools-find-procedure.query-handler';
import { ToolsFindProcedureService } from '@app/tools/procedure/application/find/tools-find-procedure.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindProcedureQueryHandler', () =>
{
    let queryHandler: ToolsFindProcedureQueryHandler;
    let service: ToolsFindProcedureService;
    let repository: ToolsMockProcedureRepository;
    let mapper: ToolsProcedureMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsFindProcedureQueryHandler,
                {
                    provide : ToolsIProcedureRepository,
                    useClass: ToolsMockProcedureRepository,
                },
                {
                    provide : ToolsFindProcedureService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<ToolsFindProcedureQueryHandler>(ToolsFindProcedureQueryHandler);
        service = module.get<ToolsFindProcedureService>(ToolsFindProcedureService);
        repository = <ToolsMockProcedureRepository>module.get<ToolsIProcedureRepository>(ToolsIProcedureRepository);
        mapper = new ToolsProcedureMapper();
    });

    describe('main', () =>
    {
        test('ToolsFindProcedureQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an procedure founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new ToolsFindProcedureQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});

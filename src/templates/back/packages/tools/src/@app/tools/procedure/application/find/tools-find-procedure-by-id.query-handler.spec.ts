import {
    ToolsFindProcedureByIdQuery,
    ToolsIProcedureRepository,
    toolsMockProcedureData,
    ToolsMockProcedureRepository,
    ToolsProcedureMapper,
} from '@app/tools/procedure';
import { ToolsFindProcedureByIdQueryHandler } from '@app/tools/procedure/application/find/tools-find-procedure-by-id.query-handler';
import { ToolsFindProcedureByIdService } from '@app/tools/procedure/application/find/tools-find-procedure-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindProcedureByIdQueryHandler', () => {
    let queryHandler: ToolsFindProcedureByIdQueryHandler;
    let service: ToolsFindProcedureByIdService;
    let repository: ToolsMockProcedureRepository;
    let mapper: ToolsProcedureMapper;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsFindProcedureByIdQueryHandler,
                {
                    provide: ToolsIProcedureRepository,
                    useClass: ToolsMockProcedureRepository,
                },
                {
                    provide: ToolsFindProcedureByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<ToolsFindProcedureByIdQueryHandler>(
            ToolsFindProcedureByIdQueryHandler,
        );
        service = module.get<ToolsFindProcedureByIdService>(
            ToolsFindProcedureByIdService,
        );
        repository = <ToolsMockProcedureRepository>(
            module.get<ToolsIProcedureRepository>(ToolsIProcedureRepository)
        );
        mapper = new ToolsProcedureMapper();
    });

    describe('main', () => {
        test('FindProcedureByIdQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an procedure founded', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(repository.collectionSource[0]),
                    ),
            );
            expect(
                await queryHandler.execute(
                    new ToolsFindProcedureByIdQuery(
                        toolsMockProcedureData[0].id,
                    ),
                ),
            ).toStrictEqual(
                mapper.mapAggregateToResponse(repository.collectionSource[0]),
            );
        });
    });
});

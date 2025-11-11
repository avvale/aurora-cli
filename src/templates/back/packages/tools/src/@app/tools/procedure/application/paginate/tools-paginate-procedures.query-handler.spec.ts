import {
    ToolsIProcedureRepository,
    ToolsMockProcedureRepository,
    ToolsPaginateProceduresQuery,
} from '@app/tools/procedure';
import { ToolsPaginateProceduresQueryHandler } from '@app/tools/procedure/application/paginate/tools-paginate-procedures.query-handler';
import { ToolsPaginateProceduresService } from '@app/tools/procedure/application/paginate/tools-paginate-procedures.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsPaginateProceduresQueryHandler', () => {
    let queryHandler: ToolsPaginateProceduresQueryHandler;
    let service: ToolsPaginateProceduresService;
    let repository: ToolsMockProcedureRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsPaginateProceduresQueryHandler,
                {
                    provide: ToolsIProcedureRepository,
                    useClass: ToolsMockProcedureRepository,
                },
                {
                    provide: ToolsPaginateProceduresService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<ToolsPaginateProceduresQueryHandler>(
            ToolsPaginateProceduresQueryHandler,
        );
        service = module.get<ToolsPaginateProceduresService>(
            ToolsPaginateProceduresService,
        );
        repository = <ToolsMockProcedureRepository>(
            module.get<ToolsIProcedureRepository>(ToolsIProcedureRepository)
        );
    });

    describe('main', () => {
        test('ToolsPaginateProceduresQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an procedures paginated', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            count: 10,
                            total: 100,
                            rows: repository.collectionSource.slice(0, 10),
                        }),
                    ),
            );
            expect(
                await queryHandler.execute(
                    new ToolsPaginateProceduresQuery({
                        offset: 0,
                        limit: 10,
                    }),
                ),
            ).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource
                        .slice(0, 10)
                        .map((item) => item.toDTO()),
                ),
            );
        });
    });
});

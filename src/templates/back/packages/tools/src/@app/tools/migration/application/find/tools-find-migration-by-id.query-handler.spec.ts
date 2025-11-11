import {
    ToolsFindMigrationByIdQuery,
    ToolsIMigrationRepository,
    ToolsMigrationMapper,
    toolsMockMigrationData,
    ToolsMockMigrationRepository,
} from '@app/tools/migration';
import { ToolsFindMigrationByIdQueryHandler } from '@app/tools/migration/application/find/tools-find-migration-by-id.query-handler';
import { ToolsFindMigrationByIdService } from '@app/tools/migration/application/find/tools-find-migration-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindMigrationByIdQueryHandler', () => {
    let queryHandler: ToolsFindMigrationByIdQueryHandler;
    let service: ToolsFindMigrationByIdService;
    let repository: ToolsMockMigrationRepository;
    let mapper: ToolsMigrationMapper;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsFindMigrationByIdQueryHandler,
                {
                    provide: ToolsIMigrationRepository,
                    useClass: ToolsMockMigrationRepository,
                },
                {
                    provide: ToolsFindMigrationByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<ToolsFindMigrationByIdQueryHandler>(
            ToolsFindMigrationByIdQueryHandler,
        );
        service = module.get<ToolsFindMigrationByIdService>(
            ToolsFindMigrationByIdService,
        );
        repository = <ToolsMockMigrationRepository>(
            module.get<ToolsIMigrationRepository>(ToolsIMigrationRepository)
        );
        mapper = new ToolsMigrationMapper();
    });

    describe('main', () => {
        test('FindMigrationByIdQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an migration founded', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(repository.collectionSource[0]),
                    ),
            );
            expect(
                await queryHandler.execute(
                    new ToolsFindMigrationByIdQuery(
                        toolsMockMigrationData[0].id,
                    ),
                ),
            ).toStrictEqual(
                mapper.mapAggregateToResponse(repository.collectionSource[0]),
            );
        });
    });
});

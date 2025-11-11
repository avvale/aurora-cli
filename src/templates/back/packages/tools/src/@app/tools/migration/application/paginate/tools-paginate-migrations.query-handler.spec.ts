import {
    ToolsIMigrationRepository,
    ToolsMockMigrationRepository,
    ToolsPaginateMigrationsQuery,
} from '@app/tools/migration';
import { ToolsPaginateMigrationsQueryHandler } from '@app/tools/migration/application/paginate/tools-paginate-migrations.query-handler';
import { ToolsPaginateMigrationsService } from '@app/tools/migration/application/paginate/tools-paginate-migrations.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsPaginateMigrationsQueryHandler', () => {
    let queryHandler: ToolsPaginateMigrationsQueryHandler;
    let service: ToolsPaginateMigrationsService;
    let repository: ToolsMockMigrationRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsPaginateMigrationsQueryHandler,
                {
                    provide: ToolsIMigrationRepository,
                    useClass: ToolsMockMigrationRepository,
                },
                {
                    provide: ToolsPaginateMigrationsService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<ToolsPaginateMigrationsQueryHandler>(
            ToolsPaginateMigrationsQueryHandler,
        );
        service = module.get<ToolsPaginateMigrationsService>(
            ToolsPaginateMigrationsService,
        );
        repository = <ToolsMockMigrationRepository>(
            module.get<ToolsIMigrationRepository>(ToolsIMigrationRepository)
        );
    });

    describe('main', () => {
        test('ToolsPaginateMigrationsQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an migrations paginated', async () => {
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
                    new ToolsPaginateMigrationsQuery({
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

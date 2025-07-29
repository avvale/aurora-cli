import { ToolsGetMigrationsQuery, ToolsIMigrationRepository, ToolsMigrationMapper, ToolsMockMigrationRepository } from '@app/tools/migration';
import { ToolsGetMigrationsQueryHandler } from '@app/tools/migration/application/get/tools-get-migrations.query-handler';
import { ToolsGetMigrationsService } from '@app/tools/migration/application/get/tools-get-migrations.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetMigrationsQueryHandler', () =>
{
    let queryHandler: ToolsGetMigrationsQueryHandler;
    let service: ToolsGetMigrationsService;
    let repository: ToolsMockMigrationRepository;
    let mapper: ToolsMigrationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsGetMigrationsQueryHandler,
                {
                    provide : ToolsIMigrationRepository,
                    useClass: ToolsMockMigrationRepository,
                },
                {
                    provide : ToolsGetMigrationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<ToolsGetMigrationsQueryHandler>(ToolsGetMigrationsQueryHandler);
        service = module.get<ToolsGetMigrationsService>(ToolsGetMigrationsService);
        repository = <ToolsMockMigrationRepository>module.get<ToolsIMigrationRepository>(ToolsIMigrationRepository);
        mapper = new ToolsMigrationMapper();
    });

    describe('main', () =>
    {
        test('ToolsGetMigrationsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an migrations founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new ToolsGetMigrationsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});

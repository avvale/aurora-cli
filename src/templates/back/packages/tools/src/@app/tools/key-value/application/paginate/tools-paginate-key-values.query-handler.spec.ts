import {
    ToolsIKeyValueRepository,
    ToolsMockKeyValueRepository,
    ToolsPaginateKeyValuesQuery,
} from '@app/tools/key-value';
import { ToolsPaginateKeyValuesQueryHandler } from '@app/tools/key-value/application/paginate/tools-paginate-key-values.query-handler';
import { ToolsPaginateKeyValuesService } from '@app/tools/key-value/application/paginate/tools-paginate-key-values.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsPaginateKeyValuesQueryHandler', () => {
    let queryHandler: ToolsPaginateKeyValuesQueryHandler;
    let service: ToolsPaginateKeyValuesService;
    let repository: ToolsMockKeyValueRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsPaginateKeyValuesQueryHandler,
                {
                    provide: ToolsIKeyValueRepository,
                    useClass: ToolsMockKeyValueRepository,
                },
                {
                    provide: ToolsPaginateKeyValuesService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<ToolsPaginateKeyValuesQueryHandler>(
            ToolsPaginateKeyValuesQueryHandler,
        );
        service = module.get<ToolsPaginateKeyValuesService>(
            ToolsPaginateKeyValuesService,
        );
        repository = <ToolsMockKeyValueRepository>(
            module.get<ToolsIKeyValueRepository>(ToolsIKeyValueRepository)
        );
    });

    describe('main', () => {
        test('ToolsPaginateKeyValuesQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an keyValues paginated', async () => {
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
                    new ToolsPaginateKeyValuesQuery({
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

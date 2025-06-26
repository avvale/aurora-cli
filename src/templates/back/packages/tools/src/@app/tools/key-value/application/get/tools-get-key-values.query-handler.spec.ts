import { ToolsGetKeyValuesQuery, ToolsIKeyValueRepository, ToolsKeyValueMapper, ToolsMockKeyValueRepository } from '@app/tools/key-value';
import { ToolsGetKeyValuesQueryHandler } from '@app/tools/key-value/application/get/tools-get-key-values.query-handler';
import { ToolsGetKeyValuesService } from '@app/tools/key-value/application/get/tools-get-key-values.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetKeyValuesQueryHandler', () =>
{
    let queryHandler: ToolsGetKeyValuesQueryHandler;
    let service: ToolsGetKeyValuesService;
    let repository: ToolsMockKeyValueRepository;
    let mapper: ToolsKeyValueMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsGetKeyValuesQueryHandler,
                {
                    provide : ToolsIKeyValueRepository,
                    useClass: ToolsMockKeyValueRepository,
                },
                {
                    provide : ToolsGetKeyValuesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<ToolsGetKeyValuesQueryHandler>(ToolsGetKeyValuesQueryHandler);
        service = module.get<ToolsGetKeyValuesService>(ToolsGetKeyValuesService);
        repository = <ToolsMockKeyValueRepository>module.get<ToolsIKeyValueRepository>(ToolsIKeyValueRepository);
        mapper = new ToolsKeyValueMapper();
    });

    describe('main', () =>
    {
        test('ToolsGetKeyValuesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an keyValues founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new ToolsGetKeyValuesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});

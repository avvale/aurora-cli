import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetLangsQueryHandler } from './get-langs.query-handler';
import { MockLangRepository } from '@app/common/lang/infrastructure/mock/mock-lang.repository';
import { ILangRepository } from '@app/common/lang/domain/lang.repository';
import { LangMapper } from '@app/common/lang/domain/lang.mapper';
import { GetLangsQuery } from './get-langs.query';
import { GetLangsService } from './get-langs.service';

describe('GetLangsQueryHandler', () =>
{
    let queryHandler: GetLangsQueryHandler;
    let service: GetLangsService;
    let repository: MockLangRepository;
    let mapper: LangMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetLangsQueryHandler,
                {
                    provide : ILangRepository,
                    useClass: MockLangRepository,
                },
                {
                    provide : GetLangsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<GetLangsQueryHandler>(GetLangsQueryHandler);
        service         = module.get<GetLangsService>(GetLangsService);
        repository      = <MockLangRepository>module.get<ILangRepository>(ILangRepository);
        mapper          = new LangMapper();
    });

    describe('main', () =>
    {
        test('GetLangsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an langs founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetLangsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
import { IamFindTagByIdQuery, IamITagRepository, iamMockTagData, IamMockTagRepository, IamTagMapper } from '@app/iam/tag';
import { IamFindTagByIdQueryHandler } from '@app/iam/tag/application/find/iam-find-tag-by-id.query-handler';
import { IamFindTagByIdService } from '@app/iam/tag/application/find/iam-find-tag-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindTagByIdQueryHandler', () =>
{
    let queryHandler: IamFindTagByIdQueryHandler;
    let service: IamFindTagByIdService;
    let repository: IamMockTagRepository;
    let mapper: IamTagMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamFindTagByIdQueryHandler,
                {
                    provide : IamITagRepository,
                    useClass: IamMockTagRepository,
                },
                {
                    provide : IamFindTagByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamFindTagByIdQueryHandler>(IamFindTagByIdQueryHandler);
        service = module.get<IamFindTagByIdService>(IamFindTagByIdService);
        repository = <IamMockTagRepository>module.get<IamITagRepository>(IamITagRepository);
        mapper = new IamTagMapper();
    });

    describe('main', () =>
    {
        test('FindTagByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an tag founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new IamFindTagByIdQuery(
                    iamMockTagData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});

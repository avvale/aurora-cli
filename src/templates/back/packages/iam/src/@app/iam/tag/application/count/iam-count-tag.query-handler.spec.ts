import { IamCountTagQuery, IamITagRepository, IamMockTagRepository } from '@app/iam/tag';
import { IamCountTagQueryHandler } from '@app/iam/tag/application/count/iam-count-tag.query-handler';
import { IamCountTagService } from '@app/iam/tag/application/count/iam-count-tag.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCountTagQueryHandler', () =>
{
    let queryHandler: IamCountTagQueryHandler;
    let service: IamCountTagService;
    let repository: IamMockTagRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCountTagQueryHandler,
                {
                    provide : IamITagRepository,
                    useClass: IamMockTagRepository,
                },
                {
                    provide : IamCountTagService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamCountTagQueryHandler>(IamCountTagQueryHandler);
        service = module.get<IamCountTagService>(IamCountTagService);
        repository = <IamMockTagRepository>module.get<IamITagRepository>(IamITagRepository);
    });

    describe('main', () =>
    {
        test('IamCountTagQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should count total inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource.length)));
            expect(await queryHandler.execute(
                new IamCountTagQuery(),
            )).toStrictEqual(repository.collectionSource.length);
        });
    });
});

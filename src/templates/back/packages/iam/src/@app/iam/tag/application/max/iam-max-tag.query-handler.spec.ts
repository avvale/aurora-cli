import { IamITagRepository, IamMaxTagQuery, IamMockTagRepository } from '@app/iam/tag';
import { IamMaxTagQueryHandler } from '@app/iam/tag/application/max/iam-max-tag.query-handler';
import { IamMaxTagService } from '@app/iam/tag/application/max/iam-max-tag.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamMaxTagQueryHandler', () =>
{
    let queryHandler: IamMaxTagQueryHandler;
    let service: IamMaxTagService;
    let repository: IamMockTagRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamMaxTagQueryHandler,
                {
                    provide : IamITagRepository,
                    useClass: IamMockTagRepository,
                },
                {
                    provide : IamMaxTagService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamMaxTagQueryHandler>(IamMaxTagQueryHandler);
        service = module.get<IamMaxTagService>(IamMaxTagService);
        repository = <IamMockTagRepository>module.get<IamITagRepository>(IamITagRepository);
    });

    describe('main', () =>
    {
        test('IamMaxTagQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.max(column))));
            expect(await queryHandler.execute(
                new IamMaxTagQuery('id'),
            )).toStrictEqual(repository.max('id'));
        });
    });
});

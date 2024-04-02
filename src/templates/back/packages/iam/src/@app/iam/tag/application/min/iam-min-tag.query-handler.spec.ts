import { IamITagRepository, IamMinTagQuery, IamMockTagRepository } from '@app/iam/tag';
import { IamMinTagQueryHandler } from '@app/iam/tag/application/min/iam-min-tag.query-handler';
import { IamMinTagService } from '@app/iam/tag/application/min/iam-min-tag.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamMinTagQueryHandler', () =>
{
    let queryHandler: IamMinTagQueryHandler;
    let service: IamMinTagService;
    let repository: IamMockTagRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamMinTagQueryHandler,
                {
                    provide : IamITagRepository,
                    useClass: IamMockTagRepository,
                },
                {
                    provide : IamMinTagService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamMinTagQueryHandler>(IamMinTagQueryHandler);
        service = module.get<IamMinTagService>(IamMinTagService);
        repository = <IamMockTagRepository>module.get<IamITagRepository>(IamITagRepository);
    });

    describe('main', () =>
    {
        test('IamMinTagQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.min(column))));
            expect(await queryHandler.execute(
                new IamMinTagQuery('id'),
            )).toStrictEqual(repository.min('id'));
        });
    });
});

import { IamITagRepository, IamMockTagRepository, IamSumTagQuery } from '@app/iam/tag';
import { IamSumTagQueryHandler } from '@app/iam/tag/application/sum/iam-sum-tag.query-handler';
import { IamSumTagService } from '@app/iam/tag/application/sum/iam-sum-tag.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamSumTagQueryHandler', () =>
{
    let queryHandler: IamSumTagQueryHandler;
    let service: IamSumTagService;
    let repository: IamMockTagRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamSumTagQueryHandler,
                {
                    provide : IamITagRepository,
                    useClass: IamMockTagRepository,
                },
                {
                    provide : IamSumTagService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamSumTagQueryHandler>(IamSumTagQueryHandler);
        service = module.get<IamSumTagService>(IamSumTagService);
        repository = <IamMockTagRepository>module.get<IamITagRepository>(IamITagRepository);
    });

    describe('main', () =>
    {
        test('IamSumTagQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should sum inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.sum(column))));
            expect(await queryHandler.execute(
                new IamSumTagQuery('id'),
            )).toStrictEqual(repository.sum('id'));
        });
    });
});

import { IamIBoundedContextRepository, IamMinBoundedContextQuery, IamMockBoundedContextRepository } from '@app/iam/bounded-context';
import { IamMinBoundedContextQueryHandler } from '@app/iam/bounded-context/application/min/iam-min-bounded-context.query-handler';
import { IamMinBoundedContextService } from '@app/iam/bounded-context/application/min/iam-min-bounded-context.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamMinBoundedContextQueryHandler', () =>
{
    let queryHandler: IamMinBoundedContextQueryHandler;
    let service: IamMinBoundedContextService;
    let repository: IamMockBoundedContextRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamMinBoundedContextQueryHandler,
                {
                    provide : IamIBoundedContextRepository,
                    useClass: IamMockBoundedContextRepository,
                },
                {
                    provide : IamMinBoundedContextService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamMinBoundedContextQueryHandler>(IamMinBoundedContextQueryHandler);
        service = module.get<IamMinBoundedContextService>(IamMinBoundedContextService);
        repository = <IamMockBoundedContextRepository>module.get<IamIBoundedContextRepository>(IamIBoundedContextRepository);
    });

    describe('main', () =>
    {
        test('IamMinBoundedContextQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.min(column))));
            expect(await queryHandler.execute(
                new IamMinBoundedContextQuery('id'),
            )).toStrictEqual(repository.min('id'));
        });
    });
});

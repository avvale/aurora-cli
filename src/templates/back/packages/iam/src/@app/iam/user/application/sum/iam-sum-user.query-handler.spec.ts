import { IamIUserRepository, IamMockUserRepository, IamSumUserQuery } from '@app/iam/user';
import { IamSumUserQueryHandler } from '@app/iam/user/application/sum/iam-sum-user.query-handler';
import { IamSumUserService } from '@app/iam/user/application/sum/iam-sum-user.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamSumUserQueryHandler', () =>
{
    let queryHandler: IamSumUserQueryHandler;
    let service: IamSumUserService;
    let repository: IamMockUserRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamSumUserQueryHandler,
                {
                    provide : IamIUserRepository,
                    useClass: IamMockUserRepository,
                },
                {
                    provide : IamSumUserService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamSumUserQueryHandler>(IamSumUserQueryHandler);
        service = module.get<IamSumUserService>(IamSumUserService);
        repository = <IamMockUserRepository>module.get<IamIUserRepository>(IamIUserRepository);
    });

    describe('main', () =>
    {
        test('IamSumUserQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should sum inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.sum(column))));
            expect(await queryHandler.execute(
                new IamSumUserQuery('id'),
            )).toStrictEqual(repository.sum('id'));
        });
    });
});

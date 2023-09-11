import { IamGetUsersQuery, IamIUserRepository, IamMockUserRepository, IamUserMapper } from '@app/iam/user';
import { IamGetUsersQueryHandler } from '@app/iam/user/application/get/iam-get-users.query-handler';
import { IamGetUsersService } from '@app/iam/user/application/get/iam-get-users.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetUsersQueryHandler', () =>
{
    let queryHandler: IamGetUsersQueryHandler;
    let service: IamGetUsersService;
    let repository: IamMockUserRepository;
    let mapper: IamUserMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamGetUsersQueryHandler,
                {
                    provide : IamIUserRepository,
                    useClass: IamMockUserRepository,
                },
                {
                    provide : IamGetUsersService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamGetUsersQueryHandler>(IamGetUsersQueryHandler);
        service = module.get<IamGetUsersService>(IamGetUsersService);
        repository = <IamMockUserRepository>module.get<IamIUserRepository>(IamIUserRepository);
        mapper = new IamUserMapper();
    });

    describe('main', () =>
    {
        test('IamGetUsersQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an users founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new IamGetUsersQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});

import { IamIUserRepository, IamMockUserRepository, IamRawSQLUsersQuery, IamUserMapper } from '@app/iam/user';
import { IamRawSQLUsersQueryHandler } from '@app/iam/user/application/raw-sql/iam-raw-sql-users.query-handler';
import { IamRawSQLUsersService } from '@app/iam/user/application/raw-sql/iam-raw-sql-users.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RawSQLUsersQueryHandler', () =>
{
    let queryHandler: IamRawSQLUsersQueryHandler;
    let service: IamRawSQLUsersService;
    let repository: IamMockUserRepository;
    let mapper: IamUserMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamRawSQLUsersQueryHandler,
                {
                    provide : IamIUserRepository,
                    useClass: IamMockUserRepository,
                },
                {
                    provide : IamRawSQLUsersService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamRawSQLUsersQueryHandler>(IamRawSQLUsersQueryHandler);
        service = module.get<IamRawSQLUsersService>(IamRawSQLUsersService);
        repository = <IamMockUserRepository>module.get<IamIUserRepository>(IamIUserRepository);
        mapper = new IamUserMapper();
    });

    describe('main', () =>
    {
        test('IamRawSQLUsersQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an users founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new IamRawSQLUsersQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});

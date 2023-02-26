import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { MockUserRepository } from '@app/iam/user/infrastructure/mock/mock-user.repository';
import { IUserRepository } from '@app/iam/user/domain/user.repository';
import { UserMapper } from '@app/iam/user/domain/user.mapper';
import { RawSQLUsersQueryHandler } from './raw-sql-users.query-handler';
import { RawSQLUsersQuery } from './raw-sql-users.query';
import { RawSQLUsersService } from './raw-sql-users.service';

describe('RawSQLUsersQueryHandler', () =>
{
    let queryHandler: RawSQLUsersQueryHandler;
    let service: RawSQLUsersService;
    let repository: MockUserRepository;
    let mapper: UserMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RawSQLUsersQueryHandler,
                {
                    provide : IUserRepository,
                    useClass: MockUserRepository,
                },
                {
                    provide : RawSQLUsersService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<RawSQLUsersQueryHandler>(RawSQLUsersQueryHandler);
        service         = module.get<RawSQLUsersService>(RawSQLUsersService);
        repository      = <MockUserRepository>module.get<IUserRepository>(IUserRepository);
        mapper          = new UserMapper();
    });

    describe('main', () =>
    {
        test('RawSQLUsersQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an users founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new RawSQLUsersQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
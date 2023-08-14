import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamMockUserRepository } from '@app/iam/user/infrastructure/mock/iam-mock-user.repository';
import { IamIUserRepository } from '@app/iam/user/domain/iam-user.repository';
import { IamUserMapper } from '@app/iam/user/domain/iam-user.mapper';
import { IamRawSQLUsersQueryHandler } from './iam-raw-sql-users.query-handler';
import { IamRawSQLUsersQuery } from './iam-raw-sql-users.query';
import { IamRawSQLUsersService } from './iam-raw-sql-users.service';

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

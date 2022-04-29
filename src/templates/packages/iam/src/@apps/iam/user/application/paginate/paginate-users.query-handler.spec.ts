import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from 'aurora-ts-core';

// custom items
import { PaginateUsersQueryHandler } from './paginate-users.query-handler';
import { MockUserRepository } from '../../../../../@apps/iam/user/infrastructure/mock/mock-user.repository';
import { IUserRepository } from '../../../../../@apps/iam/user/domain/user.repository';
import { UserMapper } from '../../../../../@apps/iam/user/domain/user.mapper';
import { PaginateUsersQuery } from './paginate-users.query';
import { PaginateUsersService } from './paginate-users.service';

describe('PaginateUsersQueryHandler', () =>
{
    let queryHandler: PaginateUsersQueryHandler;
    let service: PaginateUsersService;
    let repository: MockUserRepository;
    let mapper: UserMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateUsersQueryHandler,
                {
                    provide : IUserRepository,
                    useClass: MockUserRepository
                },
                {
                    provide : PaginateUsersService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<PaginateUsersQueryHandler>(PaginateUsersQueryHandler);
        service         = module.get<PaginateUsersService>(PaginateUsersService);
        repository      = <MockUserRepository>module.get<IUserRepository>(IUserRepository);
        mapper          = new UserMapper();
    });

    describe('main', () =>
    {
        test('PaginateUsersQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an users paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows: repository.collectionSource.slice(0,10)
                }
            )));
            expect(await queryHandler.execute(
                new PaginateUsersQuery(
                    {
                        offset: 0,
                        limit: 10
                    }
                )
            )).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource.slice(0,10).map(item => item.toDTO())
                )
            );
        });
    });
});
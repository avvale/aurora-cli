import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { IamRawSQLUsersService } from './iam-raw-sql-users.service';
import { IamIUserRepository } from '../../domain/iam-user.repository';
import { IamMockUserRepository } from '../../infrastructure/mock/iam-mock-user.repository';

describe('IamRawSQLUsersService ', () =>
{
    let service: IamRawSQLUsersService ;
    let repository: IamIUserRepository;
    let mockRepository: IamMockUserRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamRawSQLUsersService ,
                IamMockUserRepository,
                {
                    provide : IamIUserRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(IamRawSQLUsersService );
        repository      = module.get(IamIUserRepository);
        mockRepository  = module.get(IamMockUserRepository);
    });

    describe('main', () =>
    {
        test('RawSQLUsersService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get users', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});

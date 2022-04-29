/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { CreateUsersService } from './create-users.service';
import { IUserRepository } from '../../domain/user.repository';
import { MockUserRepository } from '../../infrastructure/mock/mock-user.repository';

describe('CreateUsersService', () =>
{
    let service: CreateUsersService;
    let repository: IUserRepository;
    let mockRepository: MockUserRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateUsersService,
                MockUserRepository,
                {
                    provide : IUserRepository,
                    useValue: {
                        insert: (items) => { /**/ },
                    }
                },
            ]
        }).compile();

        service         = module.get(CreateUsersService);
        repository      = module.get(IUserRepository);
        mockRepository  = module.get(MockUserRepository);
    });

    describe('main', () =>
    {
        test('CreateUsersService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create users and emit event', async () =>
        {
            expect(await service.main(
                mockRepository.collectionSource
            )).toBe(undefined);
        });
    });
});
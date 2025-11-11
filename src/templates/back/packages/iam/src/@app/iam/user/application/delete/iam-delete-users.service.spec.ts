/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamIUserRepository, IamMockUserRepository } from '@app/iam/user';
import { IamDeleteUsersService } from '@app/iam/user/application/delete/iam-delete-users.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteUsersService', () => {
    let service: IamDeleteUsersService;
    let repository: IamIUserRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamDeleteUsersService,
                IamMockUserRepository,
                {
                    provide: IamIUserRepository,
                    useValue: {
                        get: () => {
                            /**/
                        },
                        delete: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(IamDeleteUsersService);
        repository = module.get(IamIUserRepository);
    });

    describe('main', () => {
        test('IamDeleteUsersService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should delete user and emit event', async () => {
            jest.spyOn(repository, 'get').mockImplementation(
                () => new Promise((resolve) => resolve([])),
            );
            expect(await service.main({}, {})).toBe(undefined);
        });
    });
});

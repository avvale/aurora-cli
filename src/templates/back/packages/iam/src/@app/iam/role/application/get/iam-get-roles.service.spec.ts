import { IamIRoleRepository, IamMockRoleRepository } from '@app/iam/role';
import { IamGetRolesService } from '@app/iam/role/application/get/iam-get-roles.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetRolesService', () => {
    let service: IamGetRolesService;
    let repository: IamIRoleRepository;
    let mockRepository: IamMockRoleRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamGetRolesService,
                IamMockRoleRepository,
                {
                    provide: IamIRoleRepository,
                    useValue: {
                        get: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(IamGetRolesService);
        repository = module.get(IamIRoleRepository);
        mockRepository = module.get(IamMockRoleRepository);
    });

    describe('main', () => {
        test('GetRolesService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should get roles', async () => {
            jest.spyOn(repository, 'get').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource),
                    ),
            );
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});

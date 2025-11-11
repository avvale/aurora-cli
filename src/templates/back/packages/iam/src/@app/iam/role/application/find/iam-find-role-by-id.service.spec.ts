import {
    IamIRoleRepository,
    iamMockRoleData,
    IamMockRoleRepository,
} from '@app/iam/role';
import { IamFindRoleByIdService } from '@app/iam/role/application/find/iam-find-role-by-id.service';
import { IamRoleId } from '@app/iam/role/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindRoleByIdService', () => {
    let service: IamFindRoleByIdService;
    let repository: IamIRoleRepository;
    let mockRepository: IamMockRoleRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamFindRoleByIdService,
                IamMockRoleRepository,
                {
                    provide: IamIRoleRepository,
                    useValue: {
                        findById: (id) => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(IamFindRoleByIdService);
        repository = module.get(IamIRoleRepository);
        mockRepository = module.get(IamMockRoleRepository);
    });

    describe('main', () => {
        test('FindRoleByIdService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should find role by id', async () => {
            jest.spyOn(repository, 'findById').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource[0]),
                    ),
            );
            expect(
                await service.main(new IamRoleId(iamMockRoleData[0].id)),
            ).toBe(mockRepository.collectionSource[0]);
        });
    });
});

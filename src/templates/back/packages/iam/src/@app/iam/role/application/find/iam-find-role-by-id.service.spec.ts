import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { iamMockRoleData } from '@app/iam/role/infrastructure/mock/iam-mock-role.data';
import { IamFindRoleByIdService } from './iam-find-role-by-id.service';
import { IamRoleId } from '../../domain/value-objects';
import { IamIRoleRepository } from '../../domain/iam-role.repository';
import { IamMockRoleRepository } from '../../infrastructure/mock/iam-mock-role.repository';

describe('IamFindRoleByIdService', () =>
{
    let service: IamFindRoleByIdService;
    let repository: IamIRoleRepository;
    let mockRepository: IamMockRoleRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamFindRoleByIdService,
                IamMockRoleRepository,
                {
                    provide : IamIRoleRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamFindRoleByIdService);
        repository = module.get(IamIRoleRepository);
        mockRepository = module.get(IamMockRoleRepository);
    });

    describe('main', () =>
    {
        test('FindRoleByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find role by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new IamRoleId(iamMockRoleData[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});

import {
    IamITenantRepository,
    iamMockTenantData,
    IamMockTenantRepository,
} from '@app/iam/tenant';
import { IamFindTenantByIdService } from '@app/iam/tenant/application/find/iam-find-tenant-by-id.service';
import { IamTenantId } from '@app/iam/tenant/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindTenantByIdService', () => {
    let service: IamFindTenantByIdService;
    let repository: IamITenantRepository;
    let mockRepository: IamMockTenantRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamFindTenantByIdService,
                IamMockTenantRepository,
                {
                    provide: IamITenantRepository,
                    useValue: {
                        findById: (id) => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(IamFindTenantByIdService);
        repository = module.get(IamITenantRepository);
        mockRepository = module.get(IamMockTenantRepository);
    });

    describe('main', () => {
        test('FindTenantByIdService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should find tenant by id', async () => {
            jest.spyOn(repository, 'findById').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource[0]),
                    ),
            );
            expect(
                await service.main(new IamTenantId(iamMockTenantData[0].id)),
            ).toBe(mockRepository.collectionSource[0]);
        });
    });
});

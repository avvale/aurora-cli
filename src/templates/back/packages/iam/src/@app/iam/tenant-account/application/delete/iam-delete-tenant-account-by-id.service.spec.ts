/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamITenantAccountRepository,
    iamMockTenantAccountData,
    IamMockTenantAccountRepository,
} from '@app/iam/tenant-account';
import { IamDeleteTenantAccountByIdService } from '@app/iam/tenant-account/application/delete/iam-delete-tenant-account-by-id.service';
import { IamTenantAccountId } from '@app/iam/tenant-account/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteTenantAccountByIdService', () => {
    let service: IamDeleteTenantAccountByIdService;
    let repository: IamITenantAccountRepository;
    let mockRepository: IamMockTenantAccountRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamDeleteTenantAccountByIdService,
                IamMockTenantAccountRepository,
                {
                    provide: IamITenantAccountRepository,
                    useValue: {
                        deleteById: (id) => {
                            /**/
                        },
                        findById: (id) => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(IamDeleteTenantAccountByIdService);
        repository = module.get(IamITenantAccountRepository);
        mockRepository = module.get(IamMockTenantAccountRepository);
    });

    describe('main', () => {
        test('IamDeleteTenantAccountByIdService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should delete tenantAccount and emit event', async () => {
            jest.spyOn(repository, 'findById').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource[0]),
                    ),
            );
            expect(
                await service.main(
                    new IamTenantAccountId(iamMockTenantAccountData[0].id),
                    {},
                ),
            ).toBe(undefined);
        });
    });
});

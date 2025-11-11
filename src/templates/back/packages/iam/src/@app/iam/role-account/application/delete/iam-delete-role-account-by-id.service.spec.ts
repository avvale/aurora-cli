/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamIRoleAccountRepository,
    iamMockRoleAccountData,
    IamMockRoleAccountRepository,
} from '@app/iam/role-account';
import { IamDeleteRoleAccountByIdService } from '@app/iam/role-account/application/delete/iam-delete-role-account-by-id.service';
import { IamRoleAccountId } from '@app/iam/role-account/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteRoleAccountByIdService', () => {
    let service: IamDeleteRoleAccountByIdService;
    let repository: IamIRoleAccountRepository;
    let mockRepository: IamMockRoleAccountRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamDeleteRoleAccountByIdService,
                IamMockRoleAccountRepository,
                {
                    provide: IamIRoleAccountRepository,
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

        service = module.get(IamDeleteRoleAccountByIdService);
        repository = module.get(IamIRoleAccountRepository);
        mockRepository = module.get(IamMockRoleAccountRepository);
    });

    describe('main', () => {
        test('IamDeleteRoleAccountByIdService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should delete roleAccount and emit event', async () => {
            jest.spyOn(repository, 'findById').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource[0]),
                    ),
            );
            expect(
                await service.main(
                    new IamRoleAccountId(iamMockRoleAccountData[0].id),
                    {},
                ),
            ).toBe(undefined);
        });
    });
});

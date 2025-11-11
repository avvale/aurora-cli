/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamIAccountRepository,
    iamMockAccountData,
    IamMockAccountRepository,
} from '@app/iam/account';
import { IamDeleteAccountByIdService } from '@app/iam/account/application/delete/iam-delete-account-by-id.service';
import { IamAccountId } from '@app/iam/account/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteAccountByIdService', () => {
    let service: IamDeleteAccountByIdService;
    let repository: IamIAccountRepository;
    let mockRepository: IamMockAccountRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamDeleteAccountByIdService,
                IamMockAccountRepository,
                {
                    provide: IamIAccountRepository,
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

        service = module.get(IamDeleteAccountByIdService);
        repository = module.get(IamIAccountRepository);
        mockRepository = module.get(IamMockAccountRepository);
    });

    describe('main', () => {
        test('IamDeleteAccountByIdService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should delete account and emit event', async () => {
            jest.spyOn(repository, 'findById').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource[0]),
                    ),
            );
            expect(
                await service.main(
                    new IamAccountId(iamMockAccountData[0].id),
                    {},
                ),
            ).toBe(undefined);
        });
    });
});

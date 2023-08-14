/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { iamMockAccountData } from '@app/iam/account/infrastructure/mock/iam-mock-account.data';
import { IamDeleteAccountByIdService } from './iam-delete-account-by-id.service';
import { IamAccountId } from '../../domain/value-objects';
import { IamIAccountRepository } from '../../domain/iam-account.repository';
import { IamMockAccountRepository } from '../../infrastructure/mock/iam-mock-account.repository';

describe('IamDeleteAccountByIdService', () =>
{
    let service: IamDeleteAccountByIdService;
    let repository: IamIAccountRepository;
    let mockRepository: IamMockAccountRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamDeleteAccountByIdService,
                IamMockAccountRepository,
                {
                    provide : IamIAccountRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamDeleteAccountByIdService);
        repository = module.get(IamIAccountRepository);
        mockRepository = module.get(IamMockAccountRepository);
    });

    describe('main', () =>
    {
        test('IamDeleteAccountByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete account and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new IamAccountId(iamMockAccountData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { accounts } from '@apps/iam/account/infrastructure/seeds/account.seed';
import { UpdateAccountByIdService } from './update-account-by-id.service';
import {
    AccountId,
    AccountType,
    AccountEmail,
    AccountIsActive,
    AccountClientId,
    AccountDApplicationCodes,
    AccountDPermissions,
    AccountDTenants,
    AccountDScopes,
    AccountData,
    AccountRoleIds,
    AccountTenantIds,
    AccountCreatedAt,
    AccountUpdatedAt,
    AccountDeletedAt,
} from '../../domain/value-objects';
import { IAccountRepository } from '../../domain/account.repository';
import { MockAccountRepository } from '../../infrastructure/mock/mock-account.repository';

describe('UpdateAccountByIdService', () =>
{
    let service: UpdateAccountByIdService;
    let repository: IAccountRepository;
    let mockRepository: MockAccountRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateAccountByIdService,
                MockAccountRepository,
                {
                    provide : IAccountRepository,
                    useValue: {
                        updateById: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(UpdateAccountByIdService);
        repository      = module.get(IAccountRepository);
        mockRepository  = module.get(MockAccountRepository);
    });

    describe('main', () =>
    {
        test('UpdateAccountByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a account and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new AccountId(accounts[0].id),
                    type: new AccountType(accounts[0].type),
                    email: new AccountEmail(accounts[0].email),
                    isActive: new AccountIsActive(accounts[0].isActive),
                    clientId: new AccountClientId(accounts[0].clientId),
                    dApplicationCodes: new AccountDApplicationCodes(accounts[0].dApplicationCodes),
                    dPermissions: new AccountDPermissions(accounts[0].dPermissions),
                    dTenants: new AccountDTenants(accounts[0].dTenants),
                    dScopes: new AccountDScopes(accounts[0].dScopes),
                    data: new AccountData(accounts[0].data),
                    roleIds: new AccountRoleIds(accounts[0].roleIds),
                    tenantIds: new AccountTenantIds(accounts[0].tenantIds),
                },
            )).toBe(undefined);
        });
    });
});
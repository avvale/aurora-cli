/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamIRoleAccountRepository, IamMockRoleAccountRepository } from '@app/iam/role-account';
import { IamDeleteRolesAccountsService } from '@app/iam/role-account/application/delete/iam-delete-roles-accounts.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteRolesAccountsService', () =>
{
    let service: IamDeleteRolesAccountsService;
    let repository: IamIRoleAccountRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamDeleteRolesAccountsService,
                IamMockRoleAccountRepository,
                {
                    provide : IamIRoleAccountRepository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamDeleteRolesAccountsService);
        repository = module.get(IamIRoleAccountRepository);
    });

    describe('main', () =>
    {
        test('IamDeleteRolesAccountsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete roleAccount and emit event', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(
                await service.main(
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});

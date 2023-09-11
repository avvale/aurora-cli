/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamIAccountRepository, IamMockAccountRepository } from '@app/iam/account';
import { IamDeleteAccountsService } from '@app/iam/account/application/delete/iam-delete-accounts.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteAccountsService', () =>
{
    let service: IamDeleteAccountsService;
    let repository: IamIAccountRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamDeleteAccountsService,
                IamMockAccountRepository,
                {
                    provide : IamIAccountRepository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamDeleteAccountsService);
        repository = module.get(IamIAccountRepository);
    });

    describe('main', () =>
    {
        test('IamDeleteAccountsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete account and emit event', async () =>
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

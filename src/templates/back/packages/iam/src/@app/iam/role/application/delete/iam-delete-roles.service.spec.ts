/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamIRoleRepository, IamMockRoleRepository } from '@app/iam/role';
import { IamDeleteRolesService } from '@app/iam/role/application/delete/iam-delete-roles.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteRolesService', () =>
{
    let service: IamDeleteRolesService;
    let repository: IamIRoleRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamDeleteRolesService,
                IamMockRoleRepository,
                {
                    provide : IamIRoleRepository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamDeleteRolesService);
        repository = module.get(IamIRoleRepository);
    });

    describe('main', () =>
    {
        test('IamDeleteRolesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete role and emit event', async () =>
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

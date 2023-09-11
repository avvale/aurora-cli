/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamIPermissionRoleRepository, iamMockPermissionRoleData, IamMockPermissionRoleRepository } from '@app/iam/permission-role';
import { IamDeletePermissionRoleByIdService } from '@app/iam/permission-role/application/delete/iam-delete-permission-role-by-id.service';
import { IamPermissionRoleId } from '@app/iam/permission-role/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeletePermissionRoleByIdService', () =>
{
    let service: IamDeletePermissionRoleByIdService;
    let repository: IamIPermissionRoleRepository;
    let mockRepository: IamMockPermissionRoleRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamDeletePermissionRoleByIdService,
                IamMockPermissionRoleRepository,
                {
                    provide : IamIPermissionRoleRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamDeletePermissionRoleByIdService);
        repository = module.get(IamIPermissionRoleRepository);
        mockRepository = module.get(IamMockPermissionRoleRepository);
    });

    describe('main', () =>
    {
        test('IamDeletePermissionRoleByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete permissionRole and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new IamPermissionRoleId(iamMockPermissionRoleData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});

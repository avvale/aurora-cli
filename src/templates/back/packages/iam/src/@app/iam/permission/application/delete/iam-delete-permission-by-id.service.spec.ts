/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamIPermissionRepository, iamMockPermissionData, IamMockPermissionRepository } from '@app/iam/permission';
import { IamDeletePermissionByIdService } from '@app/iam/permission/application/delete/iam-delete-permission-by-id.service';
import { IamPermissionId } from '@app/iam/permission/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeletePermissionByIdService', () =>
{
    let service: IamDeletePermissionByIdService;
    let repository: IamIPermissionRepository;
    let mockRepository: IamMockPermissionRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamDeletePermissionByIdService,
                IamMockPermissionRepository,
                {
                    provide : IamIPermissionRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamDeletePermissionByIdService);
        repository = module.get(IamIPermissionRepository);
        mockRepository = module.get(IamMockPermissionRepository);
    });

    describe('main', () =>
    {
        test('IamDeletePermissionByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete permission and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new IamPermissionId(iamMockPermissionData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});

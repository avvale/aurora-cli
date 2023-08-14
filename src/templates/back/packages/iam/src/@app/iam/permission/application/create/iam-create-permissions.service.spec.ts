/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { IamCreatePermissionsService } from './iam-create-permissions.service';
import { IamIPermissionRepository } from '../../domain/iam-permission.repository';
import { IamMockPermissionRepository } from '../../infrastructure/mock/iam-mock-permission.repository';

describe('IamCreatePermissionsService', () =>
{
    let service: IamCreatePermissionsService;
    let mockRepository: IamMockPermissionRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamCreatePermissionsService,
                IamMockPermissionRepository,
                {
                    provide : IamIPermissionRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamCreatePermissionsService);
        mockRepository = module.get(IamMockPermissionRepository);
    });

    describe('main', () =>
    {
        test('CreatePermissionsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create permissions and emit event', async () =>
        {
            expect(
                await service.main(
                    mockRepository.collectionSource,
                ),
            )
                .toBe(undefined);
        });
    });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamIPermissionRepository,
    IamMockPermissionRepository,
} from '@app/iam/permission';
import { IamCreatePermissionsService } from '@app/iam/permission/application/create/iam-create-permissions.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreatePermissionsService', () => {
    let service: IamCreatePermissionsService;
    let mockRepository: IamMockPermissionRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamCreatePermissionsService,
                IamMockPermissionRepository,
                {
                    provide: IamIPermissionRepository,
                    useValue: {
                        insert: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(IamCreatePermissionsService);
        mockRepository = module.get(IamMockPermissionRepository);
    });

    describe('main', () => {
        test('CreatePermissionsService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should create permissions and emit event', async () => {
            expect(await service.main(mockRepository.collectionSource)).toBe(
                undefined,
            );
        });
    });
});

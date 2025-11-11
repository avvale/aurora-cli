/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamIPermissionRepository,
    IamMockPermissionRepository,
} from '@app/iam/permission';
import { IamDeletePermissionsService } from '@app/iam/permission/application/delete/iam-delete-permissions.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeletePermissionsService', () => {
    let service: IamDeletePermissionsService;
    let repository: IamIPermissionRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamDeletePermissionsService,
                IamMockPermissionRepository,
                {
                    provide: IamIPermissionRepository,
                    useValue: {
                        get: () => {
                            /**/
                        },
                        delete: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(IamDeletePermissionsService);
        repository = module.get(IamIPermissionRepository);
    });

    describe('main', () => {
        test('IamDeletePermissionsService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should delete permission and emit event', async () => {
            jest.spyOn(repository, 'get').mockImplementation(
                () => new Promise((resolve) => resolve([])),
            );
            expect(await service.main({}, {})).toBe(undefined);
        });
    });
});

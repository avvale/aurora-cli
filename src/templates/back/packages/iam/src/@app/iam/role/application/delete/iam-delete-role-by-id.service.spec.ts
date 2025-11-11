/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamIRoleRepository,
    iamMockRoleData,
    IamMockRoleRepository,
} from '@app/iam/role';
import { IamDeleteRoleByIdService } from '@app/iam/role/application/delete/iam-delete-role-by-id.service';
import { IamRoleId } from '@app/iam/role/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteRoleByIdService', () => {
    let service: IamDeleteRoleByIdService;
    let repository: IamIRoleRepository;
    let mockRepository: IamMockRoleRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamDeleteRoleByIdService,
                IamMockRoleRepository,
                {
                    provide: IamIRoleRepository,
                    useValue: {
                        deleteById: (id) => {
                            /**/
                        },
                        findById: (id) => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(IamDeleteRoleByIdService);
        repository = module.get(IamIRoleRepository);
        mockRepository = module.get(IamMockRoleRepository);
    });

    describe('main', () => {
        test('IamDeleteRoleByIdService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should delete role and emit event', async () => {
            jest.spyOn(repository, 'findById').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource[0]),
                    ),
            );
            expect(
                await service.main(new IamRoleId(iamMockRoleData[0].id), {}),
            ).toBe(undefined);
        });
    });
});

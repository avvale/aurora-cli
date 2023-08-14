/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { IamCreateRolesService } from './iam-create-roles.service';
import { IamIRoleRepository } from '../../domain/iam-role.repository';
import { IamMockRoleRepository } from '../../infrastructure/mock/iam-mock-role.repository';

describe('IamCreateRolesService', () =>
{
    let service: IamCreateRolesService;
    let mockRepository: IamMockRoleRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamCreateRolesService,
                IamMockRoleRepository,
                {
                    provide : IamIRoleRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamCreateRolesService);
        mockRepository = module.get(IamMockRoleRepository);
    });

    describe('main', () =>
    {
        test('CreateRolesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create roles and emit event', async () =>
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

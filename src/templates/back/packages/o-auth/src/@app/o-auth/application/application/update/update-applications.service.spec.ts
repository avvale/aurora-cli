/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { applications } from '@app/o-auth/application/infrastructure/mock/mock-application.data';
import { UpdateApplicationsService } from './update-applications.service';
import {
    ApplicationId,
    ApplicationCode,
    ApplicationName,
    ApplicationSecret,
    ApplicationIsMaster,
    ApplicationClientIds,
    ApplicationCreatedAt,
    ApplicationUpdatedAt,
    ApplicationDeletedAt,
} from '../../domain/value-objects';
import { IApplicationRepository } from '../../domain/application.repository';
import { MockApplicationRepository } from '../../infrastructure/mock/mock-application.repository';

describe('UpdateApplicationsService', () =>
{
    let service: UpdateApplicationsService;
    let repository: IApplicationRepository;
    let mockRepository: MockApplicationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateApplicationsService,
                MockApplicationRepository,
                {
                    provide : IApplicationRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(UpdateApplicationsService);
        repository      = module.get(IApplicationRepository);
        mockRepository  = module.get(MockApplicationRepository);
    });

    describe('main', () =>
    {
        test('UpdateApplicationsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a applications and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new ApplicationId(applications[0].id),
                    code: new ApplicationCode(applications[0].code),
                    name: new ApplicationName(applications[0].name),
                    secret: new ApplicationSecret(applications[0].secret),
                    isMaster: new ApplicationIsMaster(applications[0].isMaster),
                    clientIds: new ApplicationClientIds(applications[0].clientIds),
                },
            )).toBe(undefined);
        });
    });
});
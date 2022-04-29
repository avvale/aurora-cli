/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { applications } from '../../../../../@apps/o-auth/application/infrastructure/seeds/application.seed';
import { CreateApplicationService } from './create-application.service';
import {
    ApplicationId,
    ApplicationName,
    ApplicationCode,
    ApplicationSecret,
    ApplicationIsMaster,
    ApplicationClientIds,
    ApplicationCreatedAt,
    ApplicationUpdatedAt,
    ApplicationDeletedAt,
} from '../../domain/value-objects';
import { IApplicationRepository } from '../../domain/application.repository';
import { MockApplicationRepository } from '../../infrastructure/mock/mock-application.repository';

describe('CreateApplicationService', () =>

{
    let service: CreateApplicationService;
    let repository: IApplicationRepository;
    let mockRepository: MockApplicationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateApplicationService,
                MockApplicationRepository,
                {
                    provide : IApplicationRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        }).compile();

        service         = module.get(CreateApplicationService);
        repository      = module.get(IApplicationRepository);
        mockRepository  = module.get(MockApplicationRepository);
    });

    describe('main', () =>
    {
        test('CreateApplicationService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a application and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new ApplicationId(applications[0].id),
                    name: new ApplicationName(applications[0].name),
                    code: new ApplicationCode(applications[0].code),
                    secret: new ApplicationSecret(applications[0].secret),
                    isMaster: new ApplicationIsMaster(applications[0].isMaster),
                    clientIds: new ApplicationClientIds(applications[0].clientIds),
                },
            )).toBe(undefined);
        });
    });
});
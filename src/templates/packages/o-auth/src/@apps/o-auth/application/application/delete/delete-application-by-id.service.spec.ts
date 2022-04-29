/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { applications } from '../../../../../@apps/o-auth/application/infrastructure/seeds/application.seed';
import { DeleteApplicationByIdService } from './delete-application-by-id.service';
import { ApplicationId } from '../../domain/value-objects';
import { IApplicationRepository } from '../../domain/application.repository';
import { MockApplicationRepository } from '../../infrastructure/mock/mock-application.repository';

describe('DeleteApplicationByIdService', () =>
{
    let service: DeleteApplicationByIdService;
    let repository: IApplicationRepository;
    let mockRepository: MockApplicationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteApplicationByIdService,
                MockApplicationRepository,
                {
                    provide : IApplicationRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        }).compile();

        service         = module.get(DeleteApplicationByIdService);
        repository      = module.get(IApplicationRepository);
        mockRepository  = module.get(MockApplicationRepository);
    });

    describe('main', () =>
    {
        test('DeleteApplicationByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete application and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new ApplicationId(applications[0].id),
            )).toBe(undefined);
        });
    });
});
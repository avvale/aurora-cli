/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { CommonGetAdministrativeAreasLevel1Controller } from './common-get-administrative-areas-level-1.controller';

// sources
import { administrativeAreasLevel1 } from '../../../../@apps/common/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';

describe('CommonGetAdministrativeAreasLevel1Controller', () =>
{
    let controller: CommonGetAdministrativeAreasLevel1Controller;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonGetAdministrativeAreasLevel1Controller
            ],
            providers: [
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller  = module.get<CommonGetAdministrativeAreasLevel1Controller>(CommonGetAdministrativeAreasLevel1Controller);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CommonGetAdministrativeAreasLevel1Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a administrativeAreasLevel1', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel1)));
            expect(await controller.main()).toBe(administrativeAreasLevel1);
        });
    });
});
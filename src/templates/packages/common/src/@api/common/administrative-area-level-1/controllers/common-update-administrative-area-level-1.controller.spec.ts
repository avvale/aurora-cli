/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { CommonUpdateAdministrativeAreaLevel1Controller } from './common-update-administrative-area-level-1.controller';

// sources
import { administrativeAreasLevel1 } from '../../../../@apps/common/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';

describe('CommonUpdateAdministrativeAreaLevel1Controller', () =>
{
    let controller: CommonUpdateAdministrativeAreaLevel1Controller;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonUpdateAdministrativeAreaLevel1Controller
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

        controller  = module.get<CommonUpdateAdministrativeAreaLevel1Controller>(CommonUpdateAdministrativeAreaLevel1Controller);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CommonUpdateAdministrativeAreaLevel1Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a administrativeAreaLevel1 created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel1[0])));
            expect(await controller.main(administrativeAreasLevel1[0])).toBe(administrativeAreasLevel1[0]);
        });
    });
});
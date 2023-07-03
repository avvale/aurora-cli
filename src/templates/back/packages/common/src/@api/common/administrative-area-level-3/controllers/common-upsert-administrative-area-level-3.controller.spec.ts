/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonUpsertAdministrativeAreaLevel3Controller } from './common-upsert-administrative-area-level-3.controller';
import { CommonUpsertAdministrativeAreaLevel3Handler } from '../handlers/common-upsert-administrative-area-level-3.handler';

// sources
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3/infrastructure/mock/common-mock-administrative-area-level-3.data';

describe('CommonUpsertAdministrativeAreaLevel3Controller', () =>
{
    let controller: CommonUpsertAdministrativeAreaLevel3Controller;
    let handler: CommonUpsertAdministrativeAreaLevel3Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonUpsertAdministrativeAreaLevel3Controller,
            ],
            providers: [
                {
                    provide : CommonUpsertAdministrativeAreaLevel3Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonUpsertAdministrativeAreaLevel3Controller>(CommonUpsertAdministrativeAreaLevel3Controller);
        handler = module.get<CommonUpsertAdministrativeAreaLevel3Handler>(CommonUpsertAdministrativeAreaLevel3Handler);
    });

    describe('main', () =>
    {
        test('CommonUpsertAdministrativeAreaLevel3Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an administrativeAreaLevel3 upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel3Data[0])));
            expect(await controller.main(commonMockAdministrativeAreaLevel3Data[0])).toBe(commonMockAdministrativeAreaLevel3Data[0]);
        });
    });
});
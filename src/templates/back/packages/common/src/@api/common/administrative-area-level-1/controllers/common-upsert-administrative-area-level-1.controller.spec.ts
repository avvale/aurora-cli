/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonUpsertAdministrativeAreaLevel1Controller } from './common-upsert-administrative-area-level-1.controller';
import { CommonUpsertAdministrativeAreaLevel1Handler } from '../handlers/common-upsert-administrative-area-level-1.handler';

// sources
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1/infrastructure/mock/common-mock-administrative-area-level-1.data';

describe('CommonUpsertAdministrativeAreaLevel1Controller', () =>
{
    let controller: CommonUpsertAdministrativeAreaLevel1Controller;
    let handler: CommonUpsertAdministrativeAreaLevel1Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonUpsertAdministrativeAreaLevel1Controller,
            ],
            providers: [
                {
                    provide : CommonUpsertAdministrativeAreaLevel1Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonUpsertAdministrativeAreaLevel1Controller>(CommonUpsertAdministrativeAreaLevel1Controller);
        handler = module.get<CommonUpsertAdministrativeAreaLevel1Handler>(CommonUpsertAdministrativeAreaLevel1Handler);
    });

    describe('main', () =>
    {
        test('CommonUpsertAdministrativeAreaLevel1Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an administrativeAreaLevel1 upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel1Data[0])));
            expect(await controller.main(commonMockAdministrativeAreaLevel1Data[0])).toBe(commonMockAdministrativeAreaLevel1Data[0]);
        });
    });
});
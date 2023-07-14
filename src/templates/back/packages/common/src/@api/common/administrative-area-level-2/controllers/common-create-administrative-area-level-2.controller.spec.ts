import { CommonCreateAdministrativeAreaLevel2Controller, CommonCreateAdministrativeAreaLevel2Handler } from '@api/common/administrative-area-level-2';
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2';
import { CacheModule } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAdministrativeAreaLevel2Controller', () =>
{
    let controller: CommonCreateAdministrativeAreaLevel2Controller;
    let handler: CommonCreateAdministrativeAreaLevel2Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonCreateAdministrativeAreaLevel2Controller,
            ],
            providers: [
                {
                    provide : CommonCreateAdministrativeAreaLevel2Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonCreateAdministrativeAreaLevel2Controller>(CommonCreateAdministrativeAreaLevel2Controller);
        handler = module.get<CommonCreateAdministrativeAreaLevel2Handler>(CommonCreateAdministrativeAreaLevel2Handler);
    });

    describe('main', () =>
    {
        test('CommonCreateAdministrativeAreaLevel2Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an administrativeAreaLevel2 created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel2Data[0])));
            expect(await controller.main(commonMockAdministrativeAreaLevel2Data[0])).toBe(commonMockAdministrativeAreaLevel2Data[0]);
        });
    });
});

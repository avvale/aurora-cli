/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonCreateCropHandler } from '../handlers/common-create-crop.handler';
import { CommonCreateCropController } from './common-create-crop.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateCropController', () =>
{
    let controller: CommonCreateCropController;
    let handler: CommonCreateCropHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonCreateCropController,
            ],
            providers: [
                {
                    provide : CommonCreateCropHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonCreateCropController>(CommonCreateCropController);
        handler = module.get<CommonCreateCropHandler>(CommonCreateCropHandler);
    });

    describe('main', () =>
    {
        test('CommonCreateCropController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });
    });
});
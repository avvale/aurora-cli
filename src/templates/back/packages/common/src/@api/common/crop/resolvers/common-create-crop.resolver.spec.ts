/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonCreateCropHandler } from '../handlers/common-create-crop.handler';
import { CommonCreateCropResolver } from './common-create-crop.resolver';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateCropResolver', () =>
{
    let resolver: CommonCreateCropResolver;
    let handler: CommonCreateCropHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonCreateCropResolver,
                {
                    provide : CommonCreateCropHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonCreateCropResolver>(CommonCreateCropResolver);
        handler = module.get<CommonCreateCropHandler>(CommonCreateCropHandler);
    });

    test('CommonCreateCropResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonCreateCropResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });
    });
});
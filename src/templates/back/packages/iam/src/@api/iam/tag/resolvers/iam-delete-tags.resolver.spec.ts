/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamDeleteTagsHandler, IamDeleteTagsResolver } from '@api/iam/tag';
import { iamMockTagData } from '@app/iam/tag';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteTagsResolver', () =>
{
    let resolver: IamDeleteTagsResolver;
    let handler: IamDeleteTagsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamDeleteTagsResolver,
                {
                    provide : IamDeleteTagsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamDeleteTagsResolver>(IamDeleteTagsResolver);
        handler = module.get<IamDeleteTagsHandler>(IamDeleteTagsHandler);
    });

    test('IamDeleteTagsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamDeleteTagsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an iamMockTagData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockTagData)));
            expect(await resolver.main()).toBe(iamMockTagData);
        });
    });
});

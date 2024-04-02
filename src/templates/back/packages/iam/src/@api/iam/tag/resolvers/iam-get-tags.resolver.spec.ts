/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamGetTagsHandler, IamGetTagsResolver } from '@api/iam/tag';
import { iamMockTagData } from '@app/iam/tag';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetTagsResolver', () =>
{
    let resolver: IamGetTagsResolver;
    let handler: IamGetTagsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamGetTagsResolver,
                {
                    provide : IamGetTagsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamGetTagsResolver>(IamGetTagsResolver);
        handler = module.get<IamGetTagsHandler>(IamGetTagsHandler);
    });

    test('IamGetTagsResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('IamGetTagsResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a iamMockTagData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockTagData)));
            expect(await resolver.main()).toBe(iamMockTagData);
        });
    });
});

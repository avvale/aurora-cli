/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamPaginateTagsHandler, IamPaginateTagsResolver } from '@api/iam/tag';
import { iamMockTagData } from '@app/iam/tag';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateTagsResolver', () => {
    let resolver: IamPaginateTagsResolver;
    let handler: IamPaginateTagsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamPaginateTagsResolver,
                {
                    provide: IamPaginateTagsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamPaginateTagsResolver>(IamPaginateTagsResolver);
        handler = module.get<IamPaginateTagsHandler>(IamPaginateTagsHandler);
    });

    test('IamPaginateTagsResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamPaginateTagsResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a iamMockTagData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: 5,
                            count: 5,
                            rows: iamMockTagData,
                        }),
                    ),
            );
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows: iamMockTagData,
            });
        });
    });
});

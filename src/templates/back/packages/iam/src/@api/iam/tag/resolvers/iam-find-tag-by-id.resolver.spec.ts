/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamFindTagByIdHandler, IamFindTagByIdResolver } from '@api/iam/tag';
import { iamMockTagData } from '@app/iam/tag';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindTagByIdResolver', () => {
    let resolver: IamFindTagByIdResolver;
    let handler: IamFindTagByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamFindTagByIdResolver,
                {
                    provide: IamFindTagByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamFindTagByIdResolver>(IamFindTagByIdResolver);
        handler = module.get<IamFindTagByIdHandler>(IamFindTagByIdHandler);
    });

    test('IamFindTagByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamFindTagByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an tag by id', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockTagData[0])),
            );
            expect(await resolver.main(iamMockTagData[0].id)).toBe(
                iamMockTagData[0],
            );
        });
    });
});

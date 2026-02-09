# Advanced Testing Patterns

## File Upload Testing

```typescript
import * as path from 'path';

describe('File Upload E2E', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe('POST /upload/single', () => {
        it('should upload single file successfully', async () => {
            const response = await request(app.getHttpServer())
                .post('/upload/single')
                .field('title', 'Product Image')
                .field('category', 'products')
                .attach('file', path.join(__dirname, 'fixtures/image.jpg'))
                .expect(201);

            expect(response.body).toHaveProperty('fileId');
            expect(response.body).toHaveProperty('filename');
            expect(response.body.filename).toContain('.jpg');
        });

        it('should fail when file is missing', () => {
            return request(app.getHttpServer())
                .post('/upload/single')
                .field('title', 'Product Image')
                .expect(400);
        });

        it('should fail when file type is invalid', () => {
            return request(app.getHttpServer())
                .post('/upload/single')
                .attach('file', path.join(__dirname, 'fixtures/malware.exe'))
                .expect(400);
        });
    });

    describe('POST /upload/multiple', () => {
        it('should upload multiple files', async () => {
            const response = await request(app.getHttpServer())
                .post('/upload/multiple')
                .field('title', 'Product Gallery')
                .attach('files', path.join(__dirname, 'fixtures/image1.jpg'))
                .attach('files', path.join(__dirname, 'fixtures/image2.jpg'))
                .attach('files', path.join(__dirname, 'fixtures/image3.jpg'))
                .expect(201);

            expect(response.body.uploadedFiles).toHaveLength(3);
        });
    });

    describe('POST /upload/with-metadata', () => {
        it('should upload file with JSON metadata', () => {
            const metadata = {
                category: 'documentation',
                tags: ['important', 'legal'],
                expiresAt: '2025-12-31',
            };

            return request(app.getHttpServer())
                .post('/upload/with-metadata')
                .field('metadata', JSON.stringify(metadata), {
                    contentType: 'application/json',
                })
                .attach('file', path.join(__dirname, 'fixtures/document.pdf'))
                .expect(201)
                .expect((res) => {
                    expect(res.body.metadata).toEqual(metadata);
                });
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
```

## Testing with Database Seeding

```typescript
describe('Tesla E2E with Seeding', () => {
    let app: INestApplication;
    let repository: TeslaIModelRepository;
    let seeder: TeslaMockModelSeeder;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
            providers: [TeslaMockModelSeeder],
        }).compile();

        app = module.createNestApplication();
        repository = module.get<TeslaIModelRepository>(TeslaIModelRepository);
        seeder = module.get<TeslaMockModelSeeder>(TeslaMockModelSeeder);

        await repository.insert(seeder.collectionSource);
        await app.init();
    });

    it('should find seeded data', () => {
        return request(app.getHttpServer())
            .get('/tesla/model/paginate')
            .expect(200)
            .expect((res) => {
                expect(res.body.data.length).toBeGreaterThan(0);
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
```

## Testing with Custom Test Database

```typescript
beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
        imports: [
            TeslaModule,
            SequelizeModule.forRootAsync({
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    dialect: 'sqlite',
                    storage: ':memory:',
                    logging: false,
                    synchronize: true,
                    autoLoadModels: true,
                }),
            }),
        ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
});
```

## Testing Error Responses

```typescript
describe('Error Handling', () => {
    it('should return 400 for validation errors', () => {
        return request(app.getHttpServer())
            .post('/tesla/model/create')
            .send({ name: '' })
            .expect(400)
            .expect((res) => {
                expect(res.body).toHaveProperty('statusCode', 400);
                expect(res.body).toHaveProperty('message');
                expect(Array.isArray(res.body.message)).toBe(true);
            });
    });

    it('should return 404 for non-existent resource', () => {
        return request(app.getHttpServer())
            .get('/tesla/model/find/non-existent-id')
            .expect(404)
            .expect((res) => {
                expect(res.body.message).toContain('not found');
            });
    });

    it('should return 409 for duplicate entry', () => {
        return request(app.getHttpServer())
            .post('/tesla/model/create')
            .send({ id: 'duplicate-id', name: 'Model S' })
            .expect(409);
    });
});
```

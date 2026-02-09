# REST CRUD & Pagination Testing

## Testing CRUD Operations

```typescript
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('Tesla Model E2E', () => {
    let app: INestApplication;
    let teslaId: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    describe('POST /tesla/model/create', () => {
        it('should create new tesla model', async () => {
            const response = await request(app.getHttpServer())
                .post('/tesla/model/create')
                .set('Accept', 'application/json')
                .send({
                    id: 'model-uuid-1',
                    name: 'Model S',
                    description: 'Premium sedan',
                    price: 79990,
                    isActive: true,
                })
                .expect(201)
                .expect('Content-Type', /json/);

            expect(response.body).toHaveProperty('id');
            expect(response.body.name).toBe('Model S');
            teslaId = response.body.id;
        });

        it('should return 400 when name is null', () => {
            return request(app.getHttpServer())
                .post('/tesla/model/create')
                .set('Accept', 'application/json')
                .send({
                    id: 'model-uuid-2',
                    name: null,
                    price: 79990,
                })
                .expect(400)
                .expect((res) => {
                    expect(res.body.message).toContain('name');
                    expect(res.body.message).toContain('cannot be null');
                });
        });

        it('should return 400 when price is negative', () => {
            return request(app.getHttpServer())
                .post('/tesla/model/create')
                .send({
                    id: 'model-uuid-3',
                    name: 'Model X',
                    price: -1000,
                })
                .expect(400);
        });
    });

    describe('GET /tesla/model/find/:id', () => {
        it('should return tesla model by id', () => {
            return request(app.getHttpServer())
                .get(`/tesla/model/find/${teslaId}`)
                .set('Accept', 'application/json')
                .expect(200)
                .expect((res) => {
                    expect(res.body.id).toBe(teslaId);
                    expect(res.body.name).toBe('Model S');
                });
        });

        it('should return 404 when model not found', () => {
            return request(app.getHttpServer())
                .get('/tesla/model/find/non-existent-id')
                .expect(404);
        });
    });

    describe('PUT /tesla/model/update', () => {
        it('should update tesla model', () => {
            return request(app.getHttpServer())
                .put('/tesla/model/update')
                .send({ id: teslaId, price: 89990 })
                .expect(200)
                .expect((res) => {
                    expect(res.body.price).toBe(89990);
                });
        });
    });

    describe('DELETE /tesla/model/delete/:id', () => {
        it('should delete tesla model', async () => {
            await request(app.getHttpServer())
                .delete(`/tesla/model/delete/${teslaId}`)
                .expect(200);

            return request(app.getHttpServer())
                .get(`/tesla/model/find/${teslaId}`)
                .expect(404);
        });
    });
});
```

**Key Patterns:**
- ✅ Use `beforeAll` to setup app, `afterAll` to cleanup
- ✅ Store created IDs for subsequent tests
- ✅ Test happy path first, then error cases
- ✅ Always set `Accept` header for REST endpoints
- ✅ Verify deletion by attempting to find deleted resource

## Testing Pagination and Filtering

```typescript
describe('GET /tesla/model/paginate', () => {
    beforeAll(async () => {
        await repository.insert([
            { id: '1', name: 'Model S', price: 79990, isActive: true },
            { id: '2', name: 'Model 3', price: 42990, isActive: true },
            { id: '3', name: 'Model X', price: 89990, isActive: false },
            { id: '4', name: 'Model Y', price: 52990, isActive: true },
        ]);
    });

    it('should return paginated results', () => {
        return request(app.getHttpServer())
            .get('/tesla/model/paginate')
            .query({ limit: 2, offset: 0 })
            .expect(200)
            .expect((res) => {
                expect(res.body.data).toHaveLength(2);
                expect(res.body.total).toBe(4);
                expect(res.body).toHaveProperty('count');
            });
    });

    it('should filter by active status', () => {
        return request(app.getHttpServer())
            .get('/tesla/model/paginate')
            .query({
                query: JSON.stringify({
                    where: { isActive: true }
                })
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.data).toHaveLength(3);
                expect(res.body.data.every(m => m.isActive)).toBe(true);
            });
    });

    it('should sort by price descending', () => {
        return request(app.getHttpServer())
            .get('/tesla/model/paginate')
            .query({
                query: JSON.stringify({
                    order: [['price', 'DESC']]
                })
            })
            .expect(200)
            .expect((res) => {
                const prices = res.body.data.map(m => m.price);
                const sortedPrices = [...prices].sort((a, b) => b - a);
                expect(prices).toEqual(sortedPrices);
            });
    });
});
```

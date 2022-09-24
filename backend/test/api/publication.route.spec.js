import makeApp from '../../app.js';
import database from '../../database.js';
import request from 'supertest';
import mongoose from 'mongoose';
import publication from '../models/Publication.js'
const app = makeApp(database);

describe('Testing api publication',()=>{
    //beforeAll(async()=>{
      //  await mongoose.connect('mongodb://localhost/BookSale')
    //});
    //afterAll(async()=>{
      //  await mongoose.disconnect();
    //});
    describe('GET /api/publication ',()=>{
        let response;
        beforeEach(async ()=>{
            response = await request(app).get('/api/publication').send();
        });
        it('La ruta funciona',async ()=>{            
            expect(response.status).toBe(200);
            expect(response.header['content-type']).toContain('json');
        });
        it('La petición devuelve un array de publicaciones',async ()=>{
            expect(response.body).toBeInstanceOf(Array);
        });
    });
    describe('POST /api/publication',()=>{
        const newPublication ={
            userId:'00',
            title:'Mi test',
            bookName:"Test-book",
            bookAuthor:"test",
            bookEditorial:"test",
            bookYear:"2000",
            price:'1233'
        }
        const newPublication2 ={
            userId:'00',
            bookName:"Test-book",
            bookAuthor:"test",
            bookEditorial:"test",
            bookYear:"2000",
        }
        afterAll( async ()=>{
            await publication.deleteMany({userId:'00'});
        });
        it('La ruta funciona ',async ()=>{
            const response = await request(app).post('/api/publication').send(newPublication);
            expect(response.status).toBe(201);
            expect(response.header['content-type']).toContain('json');
        });
        it('La petición devulve un json con todos los atributos insertados', async ()=>{
            const response = await request(app).post('/api/publication').send(newPublication);
            expect(response.body.userId).toBeDefined();
            expect(response.body.title).toBeDefined();
            expect(response.body.bookName).toBeDefined();
            expect(response.body.bookAuthor).toBeDefined();
            expect(response.body.bookEditorial).toBeDefined();
            expect(response.body.bookYear).toBeDefined();
            expect(response.body.price).toBeDefined();
        });
        it('La peticion devuelve error',async()=>{
            const response = await request(app).post('/api/publication').send(newPublication2);
            expect(response.status).toBe(500);
        });
    })
})
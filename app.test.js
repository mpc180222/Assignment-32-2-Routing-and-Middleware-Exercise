process.env.NODE_ENV = "test";


const request = require("supertest");
const app = require("./app");
let ITEMS = require("./fakeDb");

let snickers = {product: "snickers", price: "1.99"};

beforeEach(function(){
    items.push(snickers);    

})

afterEach(function(){
    items.length = 0;    

})

//getting all products, getting a single product(found), getting a single product(not found)
//deleting a product successful/unsuccessful, adding a product successful/unsuccessful

describe("get /items", () => {
    test("get all products", async () => {
       let res = await request(app).get("/items");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({items: [snickers]});
    })
})

describe("post /items", () => {
    test("creates a new product", async () => {
       let res = await request(app).post("/items").send({product: "grapes", price: "0.75"});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({item: {product: "grapes", price: "0.75"}});
    })

    test("rejects an undefined product", async() => {
        let res = await request(app).post("/items").send({product: "bike"});
        expect(res.statusCode).toBe(405);
        expect(res.body).toEqual({"error":{"message":"Enter a valid item and price.","status":405}});

    })
})

describe("get single/item", () => {

test("retrieves a product", async() => {
    let res = await request(app).get("/items/snickers");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({"product": "snickers", "price": "1.99"});

})

test("returns an error when the product is not found", async() => {
    let res = await request(app).get("/items/snicker");
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({"error":{"message":"Item not found.","status":404}});

})

})

describe("patch/", () => {

    test("patches a product", async() => {
        let res = await request(app).patch("/items/snickers").send({product: "newsnickers", price: "0.05"});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({"updated":{"item":{"product":"newsnickers","price":"0.05"}}});

    })

    test("returns an error for invalid patch request", async() => {
        let res = await request(app).patch("/items/snickers").send({product: "newsnickers"});
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({"error":{"message":"Enter a valid item and price.","status":404}});

    })


})

describe("delete", () => {

    test("deletes a product", async() => {
        let res = await request(app).delete("/items/").send({product: "snickers"});
        expect(res.body).toEqual({"message":"deleted"});
        expect(ITEMS.length).toEqual(0);

    })

    test("returns an error for invalid delete request", async() => {
        let res = await request(app).delete("/items/").send({product: "not"});
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({"error":{"message":"Item not found.","status":404}});
        

    })


})


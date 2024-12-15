import chai from 'chai'

import supertest from 'supertest'

const expect = chai.expect

const requester = supertest("http://localhost:8080")

describe("Test Adoptions", () => {
    describe("Test para todos los endpoints de adoption.router.js",()=>{
        it("El endpoint get api/adoptions devuelve un array de adopciones", async()=>{
            const {
                statusCode,
                _body
            } = await requester.get("/api/adoptions").send()
            expect(_body.payload).to.be.an('array');
            // Verifica que cada elemento dentro del array sea un objeto de adopción
            _body.payload.forEach(item => {
                expect(item).to.be.an('object');
                expect(item).to.have.property('_id').that.is.a('string');
                expect(item).to.have.property('owner').that.is.a('string');
                expect(item).to.have.property('pet').that.is.a('string');
            });
        }),
        it("El endpoint get api/adoptions/:aid devuelve el objeto de adopción con el id pasado por parametro", async()=>{
            const aid = "675f49298453f10d7856145f";
            const {
                statusCode,
                _body
            } = await requester.get("/api/adoptions/"+aid).send()
            expect(_body.payload).to.have.property('_id').that.is.a('string');
            expect(_body.payload).to.have.property('owner').that.is.a('string');
            expect(_body.payload).to.have.property('pet').that.is.a('string');
        }),
        it("El endpoint post api/adoptions/:uid/:pid permite que el usuario :uid adopte la moscota :pid", async()=>{
            const uid = "673975af17169af3665ce597";
            const pid = "67396c316cfb39b5cfd7f063";
            const {
                statusCode,
                message
            } = await requester.post("/api/adoptions/"+uid+"/"+pid).send()
            expect(statusCode).to.be.ok;
        })
    })
}),

describe("Test Pets", () => {
    describe("Test de mascotas", () => {
        it("El endpoint /api/pets crea una mascota", async () => {
            const petMock = {
                name: "Patitas",
                specie: "Pez",
                birthDate: "10-10-2022"
            }
            const {
                statusCode,
                ok,
                _body
            } = await requester.post("/api/pets").send(petMock)
            expect(_body.payload).to.have.property("_id")
        })
    });
}),

describe("Test Sessions", () => {
    let cookie
    it("Debe loguear correctamente al usuario y devolver la cookie", async function () {
        const mockUser = {
            email: "coder@house.com",
            password: "123"
        }
        const result = await requester.post("/api/sessions/login").send(mockUser)
        const cookieResult = result.headers["set-cookie"][0]
        expect(cookieResult).to.be.ok
        cookie = {
            name: cookieResult.split("=")[0],
            value: cookieResult.split("=")[1]
        }
        expect(cookie.name).to.be.ok.and.eql("coderCookie")
        expect(cookie.value).to.be.ok
    })
    it("Debe enviar la cookie que contiene el usuario y desestructurar éste correctamente", async function () {
        const { _body } = await requester.get("/api/sessions/current").set("Cookie", [`${cookie.name}=${cookie.value}`])
        expect(_body.payload.email).to.be.eql("coder@house.com")
    })
})
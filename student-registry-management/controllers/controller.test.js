const request = require("supertest");
const app = require("../app");

describe("controller test", () => {
   beforeEach(() => {
      jest.clearAllMocks();
   });

   describe("POST /register API", () => {
      it("Returns defined StatusCode: 204", async () => {
         const response = await request(app)
            .post("/api/v1/register")
            .send({
               teacher: "john.doe@example.com",
               students: ["jane.doe@example.com", "jane.smith@example.com"],
            });

         expect(response._body.codeStatus).toBe("204");
      });
   });

   describe("POST /suspend API", () => {
      it("Returns defined StatusCode: 204", async () => {
         const response = await request(app).post("/api/v1/suspend").send({
            teacher: "teacherken@gmail.com",
            student: "studentjon@gmail.com",
         });

         expect(response._body.codeStatus).toBe("204");
      });
   });

   describe("GET /commonstudents API", () => {
      it("Returns defined StatusCode: 200", async () => {
         const response = await request(app).get(
            "/api/v1/commonstudents?teacher=teacherken%40gmail.com"
         );

         expect(response._body.codeStatus).toBe("200");
      });
   });

   describe("GET /retrievefornotifications API", () => {
      it("Returns defined StatusCode: 200", async () => {
         const response = await request(app)
            .get("/api/v1/retrievefornotifications")
            .send({
               teacher: "teacherken@gmail.com",
               notification:
                  "Hello students! @studentjon999@gmail.com @studentmiche@gmail.com",
            });

         expect(response._body.codeStatus).toBe("200");
      });
   });
});

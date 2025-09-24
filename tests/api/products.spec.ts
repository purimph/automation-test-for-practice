import { test, expect } from "@playwright/test";

test("GET / should return all products", async ({ request }) => {
  const response = await request.get("/api/productsList");

  expect(response.status()).toBe(200);
});

test("POST / should return error message when use method not supported", async ({
  request,
}) => {
  const response = await request.post("/api/productsList", {});
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.message).toBe("This request method is not supported.");
});

test("POST / should return products when search with valid product name", async ({
  request,
}) => {
  const response = await request.post("/api/searchProduct", {
    form: {
      search_product: "Tshirts",
    },
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.products[0].name).toBe("Men Tshirt");
});

test("POST / should return all products when without search product name", async ({
  request,
}) => {
  const response = await request.post("/api/searchProduct", {
    form: {
      search_product: "",
    },
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.products.length).toBeGreaterThan(0);
});

test("POST / should show error message when use already username to sign up", async ({
  request,
}) => {
  const response = await request.post("/api/verifyLogin", {
    form: {
      email: "por@gm.com",
      password: "12345",
    },
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.message).toBe("User exists!");
});

test("GET / should return all brands list", async ({ request }) => {
  const response = await request.get("/api/brandsList");
  expect(response.status()).toBe(200); 
  const body = await response.json(); 
  expect(body.brands).toBeInstanceOf(Array); // เช็คว่า body ที่ได้กลับมาเป็น Array หรือไม่
  expect(body.brands.length).toBeGreaterThan(0); // เช็คว่า Array ที่ได้มีความยาวมากกว่า 0 หรือไม่
});

test("POST / should error when use method not supported when search product", async ({ request }) => {
    const response = await request.post("/api/searchProduct", {});
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.message).toBe("Bad request, search_product parameter is missing in POST request.");
});
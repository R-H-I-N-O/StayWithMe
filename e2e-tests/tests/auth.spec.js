// @ts-check
const { test, expect } = require('@playwright/test');
const CLIENT_URL = "http://localhost:3000/"

const testMail = `testemail${Math.floor(Math.random() * 60000)+100000}@sample.com`;

test('Should allow the user to Sign In', async ({ page }) => {
  await page.goto(CLIENT_URL);

  await page.getByRole("link", {name: "Sign In"}).click();
  
  await expect(page.getByRole("heading", {name: "Sign In"})).toBeVisible();

  await page.locator("[name=email]").fill("11@11.com");
  await page.locator("[name=password]").fill("password");

  await page.getByRole("button", {name: "Sign In"}).click();

  await expect(page.getByText("Logged in successfully")).toBeVisible();

  await expect(page.getByRole("link", {name: "My Bookings"})).toBeVisible();
  await expect(page.getByRole("link", {name: "My Hotels"})).toBeVisible();
  await expect(page.getByRole("button", {name: "Sign Out"})).toBeVisible();

  await page.getByRole("button", {name: "Sign Out"}).click();

  await expect(page.getByText("Your Hotel is Our Responsibility")).toBeVisible();

});

test("should allow users to Sign Up", async ({page})=>{
  await page.goto(CLIENT_URL);

  await page.getByRole("link", {name: "Sign Up"}).click();

  await expect(page.getByRole("heading", {name: "Create an account"})).toBeVisible();

  await page.locator("[name=firstName]").fill("test");
  await page.locator("[name=lastName]").fill("test");
  await page.locator("[name=email]").fill(testMail);
  await page.locator("[name=password]").fill("@test123");
  await page.locator("[name=confirmPassword]").fill("@test123");

  await page.getByRole("button", {name: "Create Account"}).click();

  await expect(page.getByText("Registration successful")).toBeVisible();
  await expect(page.getByRole("link", {name: "My Bookings"})).toBeVisible();
  await expect(page.getByRole("link", {name: "My Hotels"})).toBeVisible();
  await expect(page.getByRole("button", {name: "Sign Out"})).toBeVisible();  

  await page.getByRole("button", {name: "Sign Out"}).click();

  await expect(page.getByText("Your Hotel is Our Responsibility")).toBeVisible();
});



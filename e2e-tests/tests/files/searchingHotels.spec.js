const { test, expect } = require('@playwright/test');
const CLIENT_URL = "http://localhost:3000/"

test.beforeEach(async ({page})=>{
    await page.goto(CLIENT_URL);

    await page.getByRole("link", {name: "Sign In"}).click();
    
    await expect(page.getByRole("heading", {name: "Sign In"})).toBeVisible();
  
    await page.locator("[name=email]").fill("11@11.com");
    await page.locator("[name=password]").fill("password");
  
    await page.getByRole("button", {name: "Sign In"}).click();
  
    await expect(page.getByText("Logged in successfully")).toBeVisible();
});

test("should let user to search and find hotel", async ({page})=>{
    await page.goto(CLIENT_URL);

    await page.getByPlaceholder("where are you going").fill("kochi");
    await page.getByRole("button", {name: "Search"}).click();

    await expect(page.getByText("Hotels found in kochi")).toBeVisible();
    await expect(page.getByText("Le Meridien Kochi")).toBeVisible();
})
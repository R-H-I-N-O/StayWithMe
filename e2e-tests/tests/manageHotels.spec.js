const { test, expect } = require('@playwright/test');
const path = require('path');
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

test("should allow users to add hotels", async ({page})=>{
    await page.goto(`${CLIENT_URL}add-hotel`);

    await page.locator("[name=name]").fill("test");
    await page.locator("[name=city]").fill("test-city");
    await page.locator("[name=country]").fill("test-country");
    await page.getByLabel("Description").fill("This is a description for testting purpose");
    await page.locator("[name=pricePerNight]").fill("123456");
    await page.selectOption("select[name='starRating']", "3");
    await

    await page.getByText("Business").click();

    await page.getByLabel("Free Wifi").check();
    await page.getByLabel("Parking").check();

    await page.locator("[name=adultCount]").fill("2");
    await page.locator("[name=childCount]").fill("1");

    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, "files", "test-img-1.jpeg"),
        path.join(__dirname, "files", "test-img-2.jpg")
    ]);

    await page.getByRole("button", {name: "Save"}).click();

    await expect(page.getByText("Hotel added successfully")).toBeVisible();
});

test("should allow users to view added hotel", async ({page})=>{
    await page.goto(`${CLIENT_URL}my-hotels`);

    await expect(page.getByRole("heading", {name: "My Hotels"})).toBeVisible();
    await expect(page.getByRole("link", {name: "Add Hotel"})).toBeVisible();

    await expect(page.getByText("Crowne Plaza")).toBeVisible();
    await expect(page.getByText("Lorem ipsum dolor")).toBeVisible();
    await expect(page.getByText("Kochi, India")).toBeVisible();
    await expect(page.getByText("Luxury")).toBeVisible();
    await expect(page.getByText("15000 per night")).toBeVisible();
    await expect(page.getByText("2 Adults, 2 Children")).toBeVisible();
    await expect(page.getByText("5 star rating")).toBeVisible();

    await expect(page.getByRole("link", {name: "Edit Hotel"}).first()).toBeVisible();
});

test("should allow users to edit hotel details", async ({page})=>{
    await page.goto(`${CLIENT_URL}my-hotels`);

    await page.getByRole("link", {name: "Edit Hotel"}).first().click();

    await page.waitForSelector("[name = 'name']", {state: "attached"});

    await expect(page.locator('[name = "name"]')).toHaveValue("Crowne Plaza");
    await page.locator('[name = "name"]').fill("Crowne Plaza updated");

    await page.getByRole("button", {name: "Save"}).click();

    await expect(page.getByText("Successfully updated hotel details")).toBeVisible();

    await page.reload();
    await page.waitForSelector("[name = 'name']", {state: "attached"});

    await page.locator('[name = "name"]').fill("Crowne Plaza");

    await page.getByRole("button", {name: "Save"}).click();
});
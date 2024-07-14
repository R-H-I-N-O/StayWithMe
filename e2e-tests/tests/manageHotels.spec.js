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
    await page.locator("[name='hotelDescription']").fill("This is a description for testting purpose");
    await page.locator("[name=pricePerNight]").fill("123456");
    await page.selectOption("select[name='starRating']", "3");

    await page.getByText("Luxury").click();

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
})
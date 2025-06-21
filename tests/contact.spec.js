const { test, expect } = require("@playwright/test");


const { contactPage } = require("./pom/contact.po.js");


test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/contact.html");
});


test.describe("Verify Name length", () => {
  test("Verify Name length should not be less than 5", async ({ page }) => {
    const contact = new contactPage(page);
    await contact.sendMessage("123", "abc@gmail.com", "some message");
    const error = await page.getByTestId(contact.nameError).textContent();
    expect(error).toBe("Name must be 5-25 characters.");
    // await page.getByTestId("abc").textContent();
  });
});
test.describe("Send valid message", () => {
  let i = 0;
  while (i < 10) {
    test("Send 10 valid message " + i, async ({ page }) => {
      const contact = new contactPage(page);
      await contact.sendMessage(
        "name " + i,
        "abc" + i + "@gmail.com",
        "some message" + i
      );
    });
    i++;
  }
});

import { expect, test } from "@playwright/test";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach(() => {
  // ... you'd put it here.
  // TODO: Is there something we need to do before every test case to avoid repeating code?
});

/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something
 * you put before parts of your test that might take time to run,
 * like any interaction with the page.
 */
test("on page load, i see a login button", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Login")).toBeVisible();
});

test("on page load, i dont see the input box until login", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("Command input")).not.toBeVisible();

  // click the login button
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Sign Out")).toBeVisible();
  await expect(page.getByLabel("Command input")).toBeVisible();
});

test("after I type into the input box, its text changes", async ({ page }) => {
  // Step 1: Navigate to a URL
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `Awesome command`;
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});

test("on page load, i see a button", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Submit")).toBeVisible();
});

test("after I click the button, its label increments", async ({ page }) => {
  // TODO WITH TA: Fill this in to test your button counter functionality!
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Submit").click();
  await page.getByLabel("Submit").click();
  await expect(page.getByLabel("Submit")).toHaveText("Submit 2 times!");
});

test("after I click the button, my command gets pushed", async ({ page }) => {
  // TODO: Fill this in to test your button push functionality!
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Command: mode")).toBeVisible();
});

test("after loading a file, the filepath is stored for viewing or searching", async ({
  page,
}) => {
  // Assuming the view or search command is issued after login
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  const mock_filePath = "mock_filepath.csv";
  await page.getByLabel("Command input").fill("load_file" + mock_filePath);
  await page.getByLabel("Submit").click();
  await expect(
    page.getByText("Result: Loaded file: " + mock_filePath)
  ).toBeVisible();
});

// test not finished
// test("after loading a file, isLoaded is set to true", async ({
//   page,
// }) => {
//   // Assuming the view or search command is issued after login
//   await page.goto("http://localhost:8000/");
//   await page.getByLabel("Login").click();
//   await page.getByLabel("Command input").click();
//   const mock_filePath = "mock_filepath.csv";
//   await page.getByLabel("Command input").fill("load_file" + mock_filePath);
//   await page.getByLabel("Submit").click();
//   await expect(page.getByText("DataTable:")).toBeVisible();
// });

test("after viewing or searching, the data table is visible", async ({
  page,
}) => {
  // Assuming the view or search command is issued after login
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("DataTable:")).toBeVisible();
});

// test for search
// test for mode
// test for adding a command by the developer
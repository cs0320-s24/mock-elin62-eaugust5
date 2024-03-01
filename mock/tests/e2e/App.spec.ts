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

test("after I click the button, if a command is not recognized, it says command unrecognized", async ({
  page,
}) => {
  // TODO: Fill this in to test your button push functionality!
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("awesome command");
  await page.getByLabel("Submit").click();
  await expect(page.getByText(`Result: Command not recognized`)).toBeVisible();
});

test("after I submit mode once, the mode changes", async ({ page }) => {
  // TODO: Fill this in to test your button push functionality!
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByLabel("Submit").click();
  await expect(
    page.getByText(`Result: mode switched to verbose`)
  ).toBeVisible();
});

test("after loading a file, the filepath gets printed", async ({ page }) => {
  // Assuming the view or search command is issued after login
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  const mock_filePath = "exampleCSV1";
  await page.getByLabel("Command input").fill("load_file " + mock_filePath);
  await page.getByLabel("Submit").click();
  await expect(
    page.getByText(`Result: Loaded file: ${mock_filePath}`)
  ).toBeVisible();
});

test("if a file is not loaded, view returns an error", async ({ page }) => {
  // Assuming the view or search command is issued after login
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit").click();
  await expect(page.getByText(`Result: Error viewing file.`)).toBeVisible();
});

test("if a loaded file is not associated with an actual CSV file, view returns an error", async ({
  page,
}) => {
  // Assuming the view or search command is issued after login
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  const mock_filePath = "mock";
  await page.getByLabel("Command input").fill("load_file" + mock_filePath);
  await page.getByLabel("Submit").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit").click();
  await expect(page.getByText(`Result: Error viewing file.`)).toBeVisible();
});

test("if search succeeds, the matching row is returned", async ({ page }) => {
  // Assuming the view or search command is issued after login
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  const mock_filePath = "exampleCSV1";
  await page.getByLabel("Command input").fill("load_file " + mock_filePath);
  await page.getByLabel("Submit").click();
  await page.getByLabel("Command input").fill("search 2 song");
  await page.getByLabel("Submit").click();
  // await expect(page.getByLabel("Row")).toHaveAttribute("aria-label", "Row");
  await expect(page.getByRole("cell", { name: /Row/ })).toBeTruthy();
});

test("if search fails, an error message appears", async ({ page }) => {
  // Assuming the view or search command is issued after login
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  const mock_filePath = "exampleCSV1";
  const mock_column = "1";
  const mock_value = "A";
  await page.getByLabel("Command input").fill("load_file" + mock_filePath);
  await page.getByLabel("Submit").click();
  await page.getByLabel("Command input").fill("search 1 A");
  await page.getByLabel("Submit").click();
  await expect(
    page.getByText(
      `No matching rows were found for ${mock_value} in ${mock_column}.`
    )
  ).toBeVisible();
});

test("after loading a real csv file, view returns the contents of that file", async ({
  page,
}) => {
  // Assuming the view or search command is issued after login
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  const mock_filePath = "exampleCSV1";
  await page.getByLabel("Command input").fill("load_file" + mock_filePath);
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit").click();
  await expect(page.getByRole("cell", { name: /Row/ })).toBeTruthy();
});

test("switching mode more than once", async ({ page }) => {
  // Assuming the view or search command is issued after login
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByLabel("Submit").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByLabel("Submit").click();
  await expect(page.getByText(`Result: mode switched to brief`)).toBeVisible();
});

test("loading different files", async ({ page }) => {
  // Assuming the view or search command is issued after login
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  const mock_filePath1 = "exampleCSV1";
  const mock_filePath2 = "exampleCSV2";
  await page.getByLabel("Command input").fill("load_file " + mock_filePath1);
  await page.getByLabel("Submit").click();
  await page.getByLabel("Command input").fill("load_file " + mock_filePath2);
  await page.getByLabel("Submit").click();
  await expect(
    page.getByText(`Result: Loaded file: exampleCSV2`)
  ).toBeVisible();
});

test("running all known commands", async ({ page }) => {
  // Assuming the view or search command is issued after login
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  const mock_filePath1 = "exampleCSV1";
  await page.getByLabel("Command input").fill("load_file " + mock_filePath1);
  await page.getByLabel("Submit").click();
  await page.getByLabel("Command input").fill("view");
  
  await page.getByLabel("Submit").click();
  await expect(
    page.getByText(`Result: Loaded file: exampleCSV2`)
  ).toBeVisible();
});

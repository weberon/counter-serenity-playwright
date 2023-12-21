import { TODO_URL } from "../Todo";

const MOCK_DATA = {
  [TODO_URL]: { userId: 1, id: 1, title: "Todo Item Mocked", completed: false },
};

/* export const mockPageRoutes = async (page) => {
  const mockKeys = Object.keys(MOCK_DATA);
  for (let i = 0; i < mockKeys.length; i++) {
    const url = mockKeys[i];
    const response = MOCK_DATA[url];
    await page.route(url, async (route) => {
      console.log("[MOCK][Routing]", { url, response });
      await route.fulfill({
        response: JSON.stringify(response),
        json: response,
      });
    });
  }
}; */

const mockPageRoute = async (page, url, response) => {
  await page.route(url, async (route) => {
    console.log("[MOCK][Routing]", { url, response });
    await route.fulfill({
      response: JSON.stringify(response || {}),
      json: response || {},
    });
  });
};

export const mockTodo = async (page) => {
  const url = TODO_URL;
  const response = MOCK_DATA[url];
  await mockPageRoute(page, url, response);
  return { url, response };
};

/* export const mockPageRoute = async(page, url, responseData) => {
    await page.route(url, async(route) => {
        console.log('[MOCK][Routing]', {url, responseData});
        await route.fulfill(responseData);
    })
} */

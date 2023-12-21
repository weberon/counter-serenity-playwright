import { By, PageElement, BrowseTheWeb, Text } from "@serenity-js/web";

export const browserInformation = async (actor) => {
  const capabilities = await BrowseTheWeb.as(actor).browserCapabilities();
  return `${capabilities.browserName} ${capabilities.browserVersion}`;
};

export const todoTitle = () => {
  return PageElement.located(By.css(".todo-title")).describedAs(
    "todo-title"
  );
};

export const textOfTodoTitle = () => {
    return Text.of(todoTitle());
};
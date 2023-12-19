import { By, PageElement, Text, Value } from "@serenity-js/web";

export const exampleInput = () => {
  return PageElement.located(By.id("example")).describedAs("example input");
};

export const exampleInputValue = () => {
  return Value.of(exampleInput());
};

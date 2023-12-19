import { By, PageElement, BrowseTheWeb, Enter, Value, Text, Click } from "@serenity-js/web";

export const incrementButton = () => {
    return PageElement
                .located(By.css(".counter-increment-btn"))
                .describedAs("counter-increment-btn");
}

export const decrementButton = () => {
    return PageElement
            .located(By.css(".counter-decrement-btn"))
            .describedAs("counter-decrement-btn");
}

export const counterValue = () => {
    return PageElement
            .located(By.css(".counter-value"))
            .describedAs("counter-value");
}

export const textOfCounterValue = () => {
  return Text.of(counterValue())
}

export const computeExpectedCounterValue = (valueToAddOrSubtract) => {
    return Text.of(counterValue()).as((v) => {
        const currentValue = parseInt(v, 10);
        const expectedValue = currentValue + valueToAddOrSubtract;
        return expectedValue.toString();
    })
}

export const browserInformation = async (actor) => {
    const capabilities = await BrowseTheWeb.as(actor).browserCapabilities();
    return `${capabilities.browserName} ${capabilities.browserVersion}`;
};
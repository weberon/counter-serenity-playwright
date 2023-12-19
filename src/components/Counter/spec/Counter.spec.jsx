import { test as componentTest } from "@playwright/experimental-ct-react";
import { Ensure } from "@serenity-js/assertions";
import { useBase } from "@serenity-js/playwright-test";
import { PageElement } from "@serenity-js/web";
import React from "react";
import Counter from "../Counter";
import {
    incrementCounterAndEnsureValueChanged,
    logBrowserInformation,
    decrementCounterAndEnsureValueChanged,
} from "./tasks";
import { textOfCounterValue } from "./questions";

const { it, describe } = useBase(componentTest);

describe("Counter App", () => {
    it("Shows Counter with initial value as zero", async ({ mount, actor }) => {
        /* const counterComponent = PageElement.from(await mount(
                <Counter  />,
            )).describedAs('Counter'); */
        PageElement.from(await mount(<Counter />)).describedAs("Counter");

        Ensure.that(textOfCounterValue(), "0");
    });

    it("Incrementing Counter Increases value", async ({ mount, actor }) => {
        PageElement.from(await mount(<Counter />)).describedAs("Counter");

        await actor.attemptsTo(
            logBrowserInformation(actor),
            incrementCounterAndEnsureValueChanged(actor)
        );

        Ensure.that(textOfCounterValue(), "1");
    });

    it("Decrementing Counter Decreases value", async ({ mount, actor }) => {
        PageElement.from(await mount(<Counter />)).describedAs("Counter");

        await actor.attemptsTo(
            logBrowserInformation(actor),
            decrementCounterAndEnsureValueChanged(actor)
        );

        Ensure.that(textOfCounterValue(), "-1");
    });

    it("Increments Twice Counter Increases twice", async ({ mount, actor }) => {
        PageElement.from(await mount(<Counter />)).describedAs("Counter");

        await actor.attemptsTo(
            logBrowserInformation(actor),
            incrementCounterAndEnsureValueChanged(actor),
            incrementCounterAndEnsureValueChanged(actor)
        );

        Ensure.that(textOfCounterValue(), "2");
    });

    it("Decrements Twice Counter decreases twice", async ({ mount, actor }) => {
        PageElement.from(await mount(<Counter />)).describedAs("Counter");

        await actor.attemptsTo(
            logBrowserInformation(actor),
            decrementCounterAndEnsureValueChanged(actor),
            decrementCounterAndEnsureValueChanged(actor)
        );

        Ensure.that(textOfCounterValue(), "-2");
    });
});

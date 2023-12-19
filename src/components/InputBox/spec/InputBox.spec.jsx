import { test as componentTest } from "@playwright/experimental-ct-react";
import { Ensure } from "@serenity-js/assertions";
import { useBase } from "@serenity-js/playwright-test";
import { PageElement } from "@serenity-js/web";
import React from "react";
import InputBox from "../InputBox";
import {
    enterValueToInputBoxAndEnsureValueChanges
} from "./tasks";
import { exampleInputValue } from "./questions";

const { it, describe } = useBase(componentTest);

describe("InputBox Component", () => {
    it("Value of InputBox is initialized with empty string", async ({ mount, actor }) => {

        PageElement.from(await mount(<InputBox />)).describedAs("InputBox");

        Ensure.that(exampleInputValue(), "");
    });

    it("Value of InputBox Changes when value is entered into it", async ({ mount, actor }) => {

        PageElement.from(await mount(<InputBox />)).describedAs("InputBox");

        await actor.attemptsTo(
            enterValueToInputBoxAndEnsureValueChanges("Joshua")
        );

        Ensure.that(exampleInputValue(), "Joshua");
    })
})
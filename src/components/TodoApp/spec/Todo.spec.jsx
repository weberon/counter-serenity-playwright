import { test as componentTest } from "@playwright/experimental-ct-react";
//import { Wait, Duration } from "@serenity-js/core"
import { Ensure } from "@serenity-js/assertions";
import { useBase } from "@serenity-js/playwright-test";
import { PageElement } from "@serenity-js/web";
import React from "react";
import { mockTodo } from "./mock.network";
import { logConsole, logRequest } from "../../../utility/test/pageUtility";
import Todo from '../Todo';
import { textOfTodoTitle } from './questions';
import { ensureTodoTitle, logBrowserInformation } from './tasks';

const { it, describe } = useBase(componentTest);

describe("Todo App", () => {
    it("Shows Mocked Todo title", async ({ mount, actor, page }) => {

        const { response } = await mockTodo(page);
        const { title: expectedTitle } = response || {};
        logConsole(page);
        logRequest(page);

        PageElement.from(await mount(<Todo />)).describedAs("Todo");

        await page.waitForTimeout(1000);

        await actor.attemptsTo(
            logBrowserInformation(actor),
            ensureTodoTitle(actor, expectedTitle),
        )

        Ensure.that(textOfTodoTitle(), expectedTitle);
    });
})
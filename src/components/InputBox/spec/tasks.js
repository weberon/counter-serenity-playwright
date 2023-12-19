import { equals, Ensure } from "@serenity-js/assertions";
import { Enter, Value } from "@serenity-js/web";
import { Task, d } from "@serenity-js/core";
import { exampleInput } from "./questions";

export const enterValueToInputBoxAndEnsureValueChanges = (value) => {
  return Task.where(
    d`#actor enters '${value}' into example input & Ensures value was entered`,
    Enter.theValue(value).into(exampleInput()),
    Ensure.that(Value.of(exampleInput()), equals(value))
  );
};

import { d, Task, TakeNotes, notes, Log, Notepad } from "@serenity-js/core";
import { textOfTodoTitle, browserInformation } from "./questions";
import { equals, Ensure } from "@serenity-js/assertions";

export const logBrowserInformation = (actor) => {
  return Task.where(
    d`#actor logs browser Information`,
    Log.the("Browser Information", browserInformation(actor))
  );
};

export const takeNoteAndLog = (subject, value) => {
  return Task.where(
    d`#actor takes Note of ${subject} & Logs it`,
    notes().set(subject, value),
    Log.the(notes().get(subject))
  );
};

export const ensureTodoTitle = (actor, expectedTodoTitle) => {
  actor.whoCan(TakeNotes.using(Notepad.empty()));
  return Task.where(
    d`#actor Ensures todo renders expected title: ${expectedTodoTitle}`,
    takeNoteAndLog("todoTitle", textOfTodoTitle()),
    takeNoteAndLog("expectedTodoTitle", expectedTodoTitle),
    Ensure.that(notes().get("todoTitle"), equals(expectedTodoTitle))
  );
};
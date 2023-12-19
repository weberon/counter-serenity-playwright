import { Answerable, Check, d, Task, TakeNotes, notes, Log, Notepad, } from '@serenity-js/core';
import {textOfCounterValue, computeExpectedCounterValue, incrementButton, browserInformation, decrementButton} from './questions';
import { By, PageElement, BrowseTheWeb, Enter, Value, Text, Click } from "@serenity-js/web";
import { equals, Ensure } from "@serenity-js/assertions";

export const takeNoteAndLog = (subject, value) => {
    return Task.where(
      d`#actor takes Note of ${subject} & Logs it`,
      notes().set(subject, value),
      Log.the(notes().get(subject))
    );
};

export const logBrowserInformation = (actor) => {
    return Task.where(d`#actor logs browser Information`,
        Log.the('Browser Information', browserInformation(actor))
    )
}

export const incrementCounterAndEnsureValueChanged = (actor) => {
    /* const counterNotes = Notepad.with({
        info: "Counter Notes",
        counterVal: undefined,
        initialCounterVal: undefined,
        expectedVal: undefined,
        misc: undefined
      }); */
      actor.whoCan(TakeNotes.using(Notepad.empty()));
      return Task.where(
        d`#actor increments Counter & Ensures that Counter is incremented`,
        takeNoteAndLog(
          "initialCounterVal",
          textOfCounterValue()
        ),
        takeNoteAndLog(
            "expectedVal",
            computeExpectedCounterValue(+1)
        ),
        Click.on(incrementButton()),
        takeNoteAndLog("counterVal", textOfCounterValue()),
        Ensure.that(notes().get("counterVal"), equals(notes().get("expectedVal")))
      );
}

export const decrementCounterAndEnsureValueChanged = (actor) => {
      actor.whoCan(TakeNotes.using(Notepad.empty()));
      return Task.where(
        d`#actor decrements Counter & Ensures that Counter is decreased`,
        takeNoteAndLog(
          "initialCounterVal",
          textOfCounterValue()
        ),
        takeNoteAndLog(
            "expectedVal",
            computeExpectedCounterValue(-1)
        ),
        Click.on(decrementButton()),
        takeNoteAndLog("counterVal", textOfCounterValue()),
        Ensure.that(notes().get("counterVal"), equals(notes().get("expectedVal")))
      );
}
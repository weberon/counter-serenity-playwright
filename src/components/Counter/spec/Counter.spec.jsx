import { test as componentTest } from '@playwright/experimental-ct-react';
import { Ensure, equals } from '@serenity-js/assertions';
import { useBase } from '@serenity-js/playwright-test';
import { PageElement } from '@serenity-js/web';
import React from 'react';
import Counter from '../Counter';
import {incrementCounterAndEnsureValueChanged, logBrowserInformation, decrementCounterAndEnsureValueChanged} from './tasks';
import {textOfCounterValue} from './questions';
//import {Counter as SerenityCounter} from './Counter.serenity'

const { it, describe } = useBase(componentTest);

describe('Counter App', () => {

    it('Shows Counter with initial value as zero', async({mount, actor}) => {
        /* const counterComponent = PageElement.from(await mount(
            <Counter  />,
        )).describedAs('Counter'); */
        PageElement.from(await mount(
            <Counter  />,
        )).describedAs('Counter');

        Ensure.that(
            textOfCounterValue(),
            '0'
        )
    })

    it('Incrementing Counter Increases value', async({mount, actor}) => {
        
        PageElement.from(await mount(
            <Counter  />,
        )).describedAs('Counter');

        await actor.attemptsTo(
            logBrowserInformation(actor),
            incrementCounterAndEnsureValueChanged(actor),
        )
        
        Ensure.that(
            textOfCounterValue(),
            '1'
        )
    })

    it('Decrementing Counter Decreases value', async({mount, actor}) => {
        
        PageElement.from(await mount(
            <Counter  />,
        )).describedAs('Counter');

        await actor.attemptsTo(
            logBrowserInformation(actor),
            decrementCounterAndEnsureValueChanged(actor),
        )
        
        Ensure.that(
            textOfCounterValue(),
            '-1'
        )
    })
})

/*
 SerenityCounter.enterExampleValue("Hello Joshua")
        const exampleValue = SerenityCounter.getExampleValue();
        console.log({exampleValue});

        let txt = (await counterComponent.answeredBy(actor)).toString
        console.log({txt});
        //const counteVal = await counterValue.text().of(counterComponent);

        const counterValue = await SerenityCounter.counterValue().of(counterComponent);
        console.log({counterValue});
        
        
        //console.log('1.0.2',{counterValue: counterValue.text().of(counterComponent)});
        console.log({browserVersion});
        console.log({component: SerenityCounter.component().of(counterComponent)});

        /* await actor.attemptsTo(
            SerenityCounter.isCounterValue(counterComponent, "0")
        ) */
        /* Ensure.eventually(
            SerenityCounter.counterValue().of(counterComponent),
            equals("5"),
        ) */
/**/
export const logConsole = (page) => {
    page.on('console', msg => {
        console.log(`[${msg.type()}]`,msg.text());
    });
}

export const logRequest = (page) => {
    const _logRequest = (interceptedRequest) => {
        console.log('A request was made:', interceptedRequest.url());
    }
    page.on('request', _logRequest);
}
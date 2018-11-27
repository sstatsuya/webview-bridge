type Message = {id: string; type: string; payload?: any};

export const createFakeAndroidPostMessage = ({
    checkMessage,
    getResponse,
}: {
    checkMessage: (msg: Message) => void;
    getResponse: (msg: Message) => Message;
}) => {
    window.tuentiWebView = {
        postMessage: jsonMessage => {
            const message = JSON.parse(jsonMessage);

            checkMessage(message);

            window.__tuenti_webview_bridge!.postMessage(
                JSON.stringify(getResponse(message)),
            );
        },
    };
};

export const removeFakeAndroidPostMessage = () => delete window.tuentiWebView;

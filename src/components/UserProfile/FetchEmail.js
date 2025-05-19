
const ConnectGmailButton = () => {
    const connectGmail = () => {
        // Just redirect the browser to the backend endpoint
        window.location.href = 'http://localhost:8080/gmail/oauth2/authorize';
    };

    return (
        <button onClick={connectGmail}>
            Connect Gmail
        </button>
    );
};

export default ConnectGmailButton;
const getURL = () =>{
    const URL = document.querySelector("#inputURL").value;
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: URL })
    })
}
const baseURL = "https://us-central1-auth-development-751fc.cloudfunctions.net/app";

export async function postUser(request) {
    const results = await fetch(`${baseURL}/newuser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    })
    return results.json();
}

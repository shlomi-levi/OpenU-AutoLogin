const chromeStorageNames: string[] = [
    "Openu-username-field",
    "Openu-password-field",
    "Openu-ID-field",
];

document.getElementById("my-form")!.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputFieldsIDS = ["username", "password", "id-number"];

    // check if all inputs were indeed typed

    for (let i = 0; i < inputFieldsIDS.length; i++) {
        let elem = document.getElementById(inputFieldsIDS[i])! as HTMLInputElement;
        if (!elem.value) {
            alert("Some input fields are missing!");
            return;
        }
    }

    for (let i = 0; i < chromeStorageNames.length; i++) {
        let tempValue: string = (
            document.getElementById(inputFieldsIDS[i])! as HTMLInputElement
        ).value;

        (async () => {
            await chrome.storage.local.set({ [chromeStorageNames[i]]: tempValue });
        })();
    }

    alert("Settings saved Successfully!");
});

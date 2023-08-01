const chromeStorageNames2: string[] = [
    "Openu-username-field",
    "Openu-password-field",
    "Openu-ID-field",
];

let Openu_Elements_IDS: string[] = ["p_user", "p_sisma", "p_mis_student"];

let Values: string[] = [];

let missingValue: boolean = false;
let missingLoginElement: boolean = false;

async function getValues() {
    for (let i = 0; i < chromeStorageNames2.length; i++) {
        await chrome.storage.local.get(chromeStorageNames2[i]).then((val) => {
            Values[i] = val[chromeStorageNames2[i]] ?? null;

            if (!Values[i]) {
                missingValue = true;
                return;
            }
        });
    }
}

const insertValues: () => void = () => {
    for (let i = 0; i < Openu_Elements_IDS.length; i++) {
        let Elem: HTMLInputElement = document.getElementById(
            Openu_Elements_IDS[i]
        ) as HTMLInputElement;

        if (!Elem) {
            missingLoginElement = true;
            console.log("Missing Login element!");
            return;
        }

        Elem.value = Values[i];
    }
};

const clickButton: () => void = () => {
    (document.querySelector("input[type=submit]")! as HTMLInputElement).click();
};

start();

async function start() {
    await getValues();

    if (missingValue || missingLoginElement) return;

    insertValues();
    clickButton();
}

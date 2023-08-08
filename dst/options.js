"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const chromeStorageNames = [
    "Openu-username-field",
    "Openu-password-field",
    "Openu-ID-field",
];
const inputFieldsIDS = ["username", "password", "id-number"];
document.getElementById("my-form").addEventListener("submit", (e) => {
    e.preventDefault();
    // check if all inputs were indeed typed
    for (let i = 0; i < inputFieldsIDS.length; i++) {
        let elem = document.getElementById(inputFieldsIDS[i]);
        if (!elem.value) {
            alert("Some input fields are missing!");
            return;
        }
    }
    for (let i = 0; i < chromeStorageNames.length; i++) {
        let tempValue = document.getElementById(inputFieldsIDS[i]).value;
        (() => __awaiter(void 0, void 0, void 0, function* () {
            yield chrome.storage.local.set({ [chromeStorageNames[i]]: tempValue });
        }))();
    }
    alert("Settings saved Successfully!");
});
function setInputFields() {
    for (let i = 0; i < chromeStorageNames.length; i++) {
        chrome.storage.local.get(chromeStorageNames[i]).then((result) => {
            if (result[chromeStorageNames[i]]) {
                document.getElementById(inputFieldsIDS[i]).value =
                    result[chromeStorageNames[i]];
            }
        });
    }
}
setInputFields();

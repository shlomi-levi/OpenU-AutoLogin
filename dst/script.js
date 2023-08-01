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
const chromeStorageNames2 = [
    "Openu-username-field",
    "Openu-password-field",
    "Openu-ID-field",
];
let Openu_Elements_IDS = ["p_user", "p_sisma", "p_mis_student"];
let Values = [];
let missingValue = false;
let missingLoginElement = false;
function getValues() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < chromeStorageNames2.length; i++) {
            yield chrome.storage.local.get(chromeStorageNames2[i]).then((val) => {
                var _a;
                Values[i] = (_a = val[chromeStorageNames2[i]]) !== null && _a !== void 0 ? _a : null;
                if (!Values[i]) {
                    missingValue = true;
                    return;
                }
            });
        }
    });
}
const insertValues = () => {
    for (let i = 0; i < Openu_Elements_IDS.length; i++) {
        let Elem = document.getElementById(Openu_Elements_IDS[i]);
        if (!Elem) {
            missingLoginElement = true;
            console.log("Missing Login element!");
            return;
        }
        Elem.value = Values[i];
    }
};
const clickButton = () => {
    document.querySelector("input[type=submit]").click();
};
start();
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        yield getValues();
        if (missingValue || missingLoginElement)
            return;
        insertValues();
        clickButton();
    });
}

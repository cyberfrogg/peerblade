import {getCookie, hasCookie} from "cookies-next";
import CurrentSessionCookieData from "@/data/auth/currentSessionCookieData";

const getCurrentSessionCookieToken = (): CurrentSessionCookieData | undefined => {
    try {
        if (!hasCookie("session"))
            return undefined;

        let cookie = getCookie("session");

        if (cookie == undefined || cookie == "")
            return undefined;

        let raw = cookie as string;

        raw = Buffer.from(raw, "base64").toString("ascii");
        let parsed = JSON.parse(raw) as CurrentSessionCookieData;

        return parsed;
    }
    catch (e) {
        console.error(e);
        return undefined;
    }
}

export default getCurrentSessionCookieToken;
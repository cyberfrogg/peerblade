export const WEBSITE_NAME: string = process.env.NEXT_PUBLIC_WEBSITE_NAME as string;
export const WEBSITE_URL: string = process.env.NEXT_PUBLIC_WEBSITE_URL as string;
export const WEBSITE_API_URL: string = process.env.NEXT_PUBLIC_WEBSITE_API_URL as string;

// pages
export const WEBSITE_PAGE_EDIT_PROFILE_URL = WEBSITE_URL + "/edit-profile";
export const WEBSITE_PAGE_TAGS_URL = WEBSITE_URL + "/tags";
export const WEBSITE_PAGE_SIGN_IN = WEBSITE_URL + "/auth/sign-in";
export const WEBSITE_PAGE_JOIN = WEBSITE_URL + "/auth/join";

// pages parts
export const WEBSITE_PAGE_USER_URL = WEBSITE_URL + "/user";
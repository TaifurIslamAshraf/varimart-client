import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

let defaultLocale = "en";
let locales = ["en", "bn"];

//get the preferred locals
function getLocale(req: NextRequest) {
  const acceptedLanguage = req.headers.get("accept-language") ?? undefined;
  let headers = { "accept-language": acceptedLanguage };
  let languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale);
}

export function middleware(req: NextRequest) {
  //check if there is any supported locale in the pathname
  const pathname = req.nextUrl.pathname;
  const pathNameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  //redirect if there is no locals
  if (pathNameIsMissingLocale) {
    const locale = getLocale(req);

    return NextResponse.redirect(new URL(`/${locale}/${pathname}`, req.url));
  }
}

export const config = {
  matcher: [
    //skip all internal paths (_next, assest, api)
    "/((?!api|assets|.*\\..*|_next).*)",
  ],
};

import { useEffect, useState } from 'react';
import { default as Cookies } from "js-cookie";

export const useCookie = (cookieName: string) => {
  const [cookieValue, setCookieValue] = useState<string|undefined>(undefined);

  useEffect(() => {
    const cookieVal = Cookies.get(cookieName);
    setCookieValue(cookieVal);
  }, [cookieName]);

  return cookieValue;
};
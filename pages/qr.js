import { useEffect } from 'react';
import Router from 'next/router';

export default function QR() {
  useEffect(() => {
    const instagramUrl = 'https://www.instagram.com/terpmetr.x/';
    Router.push(instagramUrl);
  }, []);

  return null;
}
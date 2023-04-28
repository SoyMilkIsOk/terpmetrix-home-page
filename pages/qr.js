import { useEffect } from 'react';
import Router from 'next/router';

export default function QR() {
  useEffect(() => {
    const url = 'https://links.terpmetrix.com';
    Router.push(url);
  }, []);

  return null;
}
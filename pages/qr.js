import { useEffect } from 'react';
import Router from 'next/router';

export default function QR() {
  useEffect(() => {
    const url = 'https://instagram.com/terpscoops';
    Router.push(url);
  }, []);

  return null;
}
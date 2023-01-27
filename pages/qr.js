import { useEffect } from 'react';
import Router from 'next/router';

export default function QR() {
  useEffect(() => {
    Router.push('/');
  }, []);

  return null;
}
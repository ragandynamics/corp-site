// src/types/global.d.ts
declare global {
  interface Window {
    turnstile: {
      render: (selector: string, options?: any) => string;
      reset: (id?: string) => void;
    };
  }
}
export {};

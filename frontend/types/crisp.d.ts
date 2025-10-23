declare global {
  interface Window {
    $crisp?: any[];
  }
}

declare module 'crisp-sdk-web' {
  export function configure(websiteId: string): void;
  export function push(command: string[]): void;
}

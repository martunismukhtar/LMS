// global.d.ts
export {};

declare global {
  interface Window {
    snap: unknown; // Ubah 'any' ke tipe data spesifik jika Anda tahu tipenya
    snap: {
        pay(token: string): void;
      };
  }
}

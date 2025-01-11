// Middleware untuk mengonversi BigInt ke string saat serialisasi JSON
export const serializeBigInt = () => {
    JSON.stringify(
        this,
        (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
      )
  };
  
  // Jalankan middleware ini saat file diimpor
  serializeBigInt();
  
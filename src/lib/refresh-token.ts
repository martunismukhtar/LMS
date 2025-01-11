import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
    // Mengambil cookies dari konteks permintaan
    const cookies = context.req.cookies;
    const refreshToken = cookies.refreshToken;
    console.log(`refreshToken ${refreshToken}`);
    if (!refreshToken) {
      return {
        redirect: {
          destination: '/login',  // Redirect ke halaman login jika token tidak ada
          permanent: false,
        },
      };
    }
  
    // Proses dengan refresh token jika ada
    // Misalnya, verifikasi token atau buat access token baru
    // const user = jwt.verify(refreshToken, 'your-refresh-token-secret');
    
    return {
      props: { refreshToken }, // Menyertakan refresh token dalam props
    };
  };
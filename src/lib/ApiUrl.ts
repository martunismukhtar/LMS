import axios from "axios";

export const api = axios.create({
    baseURL: process.env.VITE_API,
    withCredentials: true,
    // headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    //     "Access-Control-Allow-Headers": "Content-Type, Authorization",
    //     "Access-Control-Allow-Credentials": "true",        
        
    // }
});

api.interceptors.response.use(
    response => response,
    async (error) => {
      const originalRequest = error.config;
  
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          const { data } = await axios.post(`${process.env.VITE_API}refreshToken`);
          api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
          return api(originalRequest);
        } catch (err) {
          // Handle jika refresh token gagal
          console.error(err);
          console.log('Refresh token failed, redirecting to login...');
        //   window.location.href = '/login';
        }
      }
  
      return Promise.reject(error);
    }
  );

  export default api
'use client'

import { useEffect, useState } from "react";
import Layout from "../layouts/landing";
// import { useSession } from "next-auth/react";

const Courses = () => {
  // const {data:session} = useSession()
  const [courses, setData] = useState([]);
    // console.log(session?.accessToken)
    // const accessToken = session?.accessToken as string;
    
    
    useEffect(() => {
      fetch('api/courses')
          .then(res => res.json())
          .then(data => setData(data || []))
          .catch(err => console.error('Error fetching products:', err));

      
    }, [])
    return (
        <Layout>
            <h1>Courses</h1>
            <p>{JSON.stringify(courses)}</p>
        </Layout>
    )    
  }; 
export default Courses       
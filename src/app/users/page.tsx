import Button from "../components/views/button";
import Layout from "../layouts/landing";
// import { useSession } from "next-auth/react";

const Users = () => {
    // const { data: session } = useSession()

  // console.log(session)
    return (
        <Layout>
            <h1>Posts</h1>
            <Button>Button</Button>
        </Layout>
    );
};

export default Users;
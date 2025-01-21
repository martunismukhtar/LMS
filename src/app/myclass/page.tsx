
import CourseView from "@/components/Fragments/Course/Index"
import Layout from "../layouts/landing"

const MyClass=() => {
    return (
        <Layout>
            <section className="flex flex-row flex-wrap p-5 border border-red-700 max-w-6xl mx-auto mt-5">
                <h1>My Courses</h1>
                <div className="border-b border-sky-950 h-1 w-full mb-5"></div>
                <CourseView />
            </section>
        </Layout>
    )
}
export default MyClass
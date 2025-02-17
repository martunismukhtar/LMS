import AdminLayout from "@/app/layouts/admin";
import CourseForm from "@/components/Fragments/CourseForm/Index";

const AddCourse = () => {
  
  return (
    <AdminLayout>
      <h1>Add Course</h1>      
      <div className="bg-white p-4 max-w-[45rem]">
        <CourseForm />
      </div>
    </AdminLayout>
  );
};
export default AddCourse;

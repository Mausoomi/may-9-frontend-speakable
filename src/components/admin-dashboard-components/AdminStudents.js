import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";
import { fetchAllstudents } from "../../store/actions/studentsActions";

const AdminStudents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const students = useSelector((state) => state.students.studentslist);
  // console.log(students);
  useEffect(() => {
    dispatch(fetchAllstudents());
  }, [dispatch]);

  const ProfileHandler = (id) => {
    navigate(`/Admin-Dashboard/Students/studentsDetails/${id}`);
  };

  return (
    <>
      <AdminNav />
      <div className="Student_mainPage_style">
        <div className="Student_header_style">
          <h6 className="text-dark">Students Table</h6>
          <Link to="/Admin-Dashboard/Students/add-student">
            <button className="btn btn-outline-success">Add Students</button>
          </Link>
        </div>
        <div className="Teacher_list_style mt-3">
          {students?.length > 0 ? (
            students?.map((Student) => (
              <div key={Student._id} className="teacher_card">
                {Student.Profile_Image.length > 0 ? (
                  <div className="teacher_card_img_div">
                    <img
                      src={`https://ik.imagekit.io/8s3jwexmv/${Student.Profile_Image}`}
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="teacher_card_img_div">
                    {Student.Username.slice(0, 1).toUpperCase()}
                  </div>
                )}
                <h5>{Student.Username}</h5>
                <h6>{Student.UserType}</h6>
                <div className="d-flex flex-wrap w-100 justify-content-center flex-column align-items-center">
                  {Student?.Courses_assign?.map((course) => (
                    <span
                      className="teacher_card_course_span mt-1"
                      key={course._id}
                    >
                      {course.Course_Name}
                    </span>
                  ))}
                </div>
                <button
                  onClick={(e) => ProfileHandler(Student._id)}
                  className="btn btn-outline-success"
                >
                  Profile
                </button>
              </div>
            ))
          ) : (
            <p>No students available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminStudents;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetch1teacher } from "../../store/actions/teachersActions";
import { GetTeachers } from "../../store/actions/teachersActions";
// import { fetch1course } from '../../store/actions/coursesActions';

const Teacher = () => {
  const navigate = useNavigate();

  const NavigationHandler = () => {
    navigate("/Scedule-Meeting");
  };
  const dispatch = useDispatch();
  const teacherDetail = useSelector((state) => state.teachers.Teacher);

  const [randomTeacher, setRandomTeacher] = useState(null);

  useEffect(() => {
    dispatch(fetch1teacher());
    dispatch(GetTeachers());
    console.log(teacherDetail)
  }, [dispatch]);

  const teachers = useSelector((state) => state.teachers.Teacherslist);

  useEffect(() => {
    if (teachers?.length > 0) {
      const randomIndex = Math.floor(Math.random() * teachers.length);
      setRandomTeacher(teachers[randomIndex]);
    }
  }, [teachers]);
  
  return (
    <div className="d-flex justify-content-center align-items-center teachers_main_div" id="Teacher">
    
    {randomTeacher && (
      <div className="d-flex justify-content-center align-items-center teacher-data">
        <div className="teachers_left_div">
          <img
            src={`https://ik.imagekit.io/8s3jwexmv/${randomTeacher.Profile_Image}`}
            alt=""
          />
        </div>
        <div className="teachers_right_div">
          <Link
            to={`/TeacherDetails/${randomTeacher._id}`}
            className="teachers_right_div_link"
          >
            <h3>{randomTeacher.Username.split(" ")}</h3>
          </Link>
          <p>{randomTeacher.Description}</p>
          <button
            onClick={NavigationHandler}
            className="btn btn-outline-success teachers_right_div_btn"
          >
            Book a free trial
          </button>
        </div>
      </div>
    )}
  </div>
    // <div className="col-md-12 d-flex justify-content-center  align-items-center teachers_main_div" id="Teacher">
    //   {teacherDetail.map((teacher) => (
    //     <>

    //       <div className="d-flex justify-content-center  align-items-center teacher-data">
    //         <div key={teacher._id} className=" teachers_left_div">
    //           <img
    //             src={`https://ik.imagekit.io/8s3jwexmv/${teacher.Profile_Image}`}
    //             alt=""
    //           />
    //         </div>
    //         <div className="teachers_right_div ">
    //           <Link
    //             to={`/TeacherDetails/${teacher._id}`}
    //             className="teachers_right_div_link"
    //           >
    //             <h3>{teacher.Username.split(" ")[0]}</h3>
    //           </Link>
    //           <p>{teacher.Description}</p>
    //           <button
    //             onClick={NavigationHandler}
    //             className="btn btn-outline-success  teachers_right_div_btn   mt-4 "
    //           >
    //             Book a free trial
    //           </button>
    //         </div>
    //       </div>

    //     </>
    //   ))}
    // </div>
  );
  // return (
  //   <div className="col-md-12 d-flex justify-content-center  align-items-center teachers_main_div" id="Teacher">
  //     {teacherDetail.map((teacher) => (
  //       <>

  //         <div className="d-flex justify-content-center  align-items-center teacher-data">
  //           <div key={teacher._id} className=" teachers_left_div">
  //             <img
  //               src={`https://ik.imagekit.io/8s3jwexmv/${teacher.Profile_Image}`}
  //               alt=""
  //             />
  //           </div>
  //           <div className="teachers_right_div ">
  //             <Link
  //               to={`/TeacherDetails/${teacher._id}`}
  //               className="teachers_right_div_link"
  //             >
  //               <h3>{teacher.Username.split(" ")[0]}</h3>
  //             </Link>
  //             <p>{teacher.Description}</p>
  //             <button
  //               onClick={NavigationHandler}
  //               className="btn btn-outline-success  teachers_right_div_btn   mt-4 "
  //             >
  //               Book a free trial
  //             </button>
  //           </div>
  //         </div>

  //       </>
  //     ))}
  //   </div>
  // );
};

export default Teacher;

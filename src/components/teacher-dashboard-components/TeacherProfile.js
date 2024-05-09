import React from "react";
import { useSelector } from "react-redux";
import AdminNav from "../admin-dashboard-components/AdminNav";
import { useNavigate } from "react-router-dom";

const TeacherProfile = () => {
  const student = useSelector((state) => state.students.user);
  const navigate = useNavigate()
  // console.log(student.Profile_Image)
  console.log(student);

  const formData = student
  const handleEditAvailability = (id) => {
    navigate(`/Teacher-dashboard/Edit-Availability/${id}`, {
      state: { formData },
    });
  };

  return (
    <>
      <AdminNav />
      <div className="StudentProfile_mainPage_style">
        <div className="StudentProfile_header_style">
          <div className="Profile_header_imgdiv">
            <img
              src={`https://ik.imagekit.io/8s3jwexmv/${student?.Profile_Image}`}
              alt=""
            />
          </div>
        </div>

        <div className="row StudentName_style mt-5">
          <h1 className="studentName">{student?.Username}</h1>
          <p className="studenttext">{student?.UserType}</p>
        </div>

        <div className="row">
          <div className="col-md-6 col-xs-12 ">
            <div className="userDetail">
              <div className="userDetaildiv">
                <i className="bi bi-person userDetailIcon"></i>
              </div>
              <div className="userDetailText">
                <p className="userDetailTextTitle">Email:</p>
                <p className="userDetailTextData">{student?.Email}</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xs-12">
            <div className="userDetail">
              <div className="userDetaildiv">
                <i className="bi bi-geo-alt userDetailIcon"></i>
              </div>
              <div className="userDetailText">
                <p className="userDetailTextTitle">Address:</p>
                <p className="userDetailTextData">{student?.Address}</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xs-12">
            <div className="userDetail">
              <div className="userDetaildiv">
                <i className="bi bi-telephone userDetailIcon"></i>
              </div>
              <div className="userDetailText">
                <p className="userDetailTextTitle">Phone:</p>
                <p className="userDetailTextData">{student?.Phone_Number}</p>
              </div>
            </div>
          </div>

          {/* <div className="col-md-6 col-xs-12">
            <div className="userDetail">
              <div className="userDetaildiv">
                <i className="bi bi-columns-gap userDetailIcon"></i>
              </div>
              <div className="userDetailText">
                <p className="userDetailTextTitle">Teacher Id:</p>
                <p className="userDetailTextData">{student?._id}</p>
              </div>
            </div>
          </div> */}
          <div className="col-md-6 ">
            <div className="userDetail">
              <div className="userDetaildiv">
                <i className="bi bi-box-arrow-right userDetailIcon"></i>
              </div>
              <div className="userDetailText">
                <p className="userDetailTextTitle">Description</p>
                <p className="userDetailTextData">{student?.Description}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 ">
            <div className="userDetail">
              <div className="userDetaildiv">
                <i className="bi bi-box-arrow-right userDetailIcon"></i>
              </div>
              <div className="userDetailText">
                <p className="userDetailTextTitle">Short Title</p>
                <p className="userDetailTextData">{student?.Short_Title}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 ">
            <div className="userDetail">
              <div className="userDetaildiv">
                <i className="bi bi-box-arrow-right userDetailIcon"></i>
              </div>
              <div className="userDetailText">
                <p className="userDetailTextTitle">Availability</p>
                <p className="userDetailTextData">
                  {/* {console.log(student)} */}
                  {student?.Availability.map((dateObject, index) => (
                    <div key={index}>
                      {Object.keys(dateObject).map((date, dateIndex) => (
                        <div key={dateIndex}>
                          <h6>{date}</h6>
                          <ul>
                            {dateObject[date].map((timeSlot, timeIndex) => (
                              <li key={timeIndex}>
                                {timeSlot.start} - {timeSlot.end}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ))}
                </p>
                <button className="btn btn-outline-success" onClick={() => handleEditAvailability(student._id)} >Edit Availability</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherProfile;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { imageUpload } from "../../store/actions/teachersActions";
import { Getcourses } from "../../store/actions/coursesActions";
// import AdminNav from "./AdminNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const AdminAddTeachers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courses = useSelector((state) => state.courses.courseslist);
  // console.log(courses)

  const [formData, setFormData] = useState({
    teacherName: "",
    password: "",
    phoneNumber: "",
    address: "",
    coursesAssign: [],
    purchasePrice: "",
    description: "",
    shortTitle: "",
    Email: "",
    Profile_Image: [],
    socialLinks: [
      { platform: "facebook", link: "" },
      { platform: "twitter", link: "" },
      { platform: "instagram", link: "" },
      // Add more social media platforms if needed
    ],
  });

  useEffect(() => {
    dispatch(Getcourses());
  }, []);

  // Function to check if all required fields are filled
  const isFormValid = () => {
    const requiredFields = [
      "teacherName",
      "password",
      "phoneNumber",
      "address",
      "purchasePrice",
      "description",
      "shortTitle",
      "Email",
    ];
    const missingFields = requiredFields.filter(
      (field) => formData[field].trim() === ""
    );
    return { isValid: missingFields.length === 0, missingFields };
  };

  const handleCheckboxChange = (course) => {
    setFormData((prevData) => {
      const isSelected = prevData.coursesAssign.includes(course);
      if (isSelected) {
        return {
          ...prevData,
          coursesAssign: prevData.coursesAssign.filter((id) => id !== course),
        };
      } else {
        return {
          ...prevData,
          coursesAssign: [...prevData.coursesAssign, course],
        };
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name)

  
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
    
    

    //  let newValue = e.target.value;

    //  // Check if the entered value is negative
    //  if (newValue < 0) {
    //    // If negative, set it to 0
    //    newValue = 0;
    //  }

    //  // Update the state with the new value
    //  setFormData({
    //    ...formData,
    //    purchasePrice: newValue,
    //  });
  };

  const handleSocialLinkChange = (index, platform, value) => {
    setFormData((prevData) => {
      const updatedSocialLinks = [...prevData.socialLinks];
      updatedSocialLinks[index] = {
        ...updatedSocialLinks[index],
        platform,
        link: value,
      };
      return {
        ...prevData,
        socialLinks: updatedSocialLinks,
      };
    });
  };

  const handleFileUpload = async (event) => {
    const image = event.target.files[0];
    const uploadResult = await dispatch(imageUpload(image));
    setFormData({
      ...formData,
      Profile_Image: formData.Profile_Image?.length
        ? [...formData.Profile_Image, uploadResult.payload]
        : [uploadResult.payload],
    });
  };

  const handleImageRemoval = async (val) => {
    setFormData({
      ...formData,
      Profile_Image: [...formData.Profile_Image.filter((img) => img != val)],
    });
    // setMedia([...media.filter((img) => img != val)]);
  };

  const NextHandler = () => {
    const { isValid, missingFields } = isFormValid();
    if (isValid) {
      navigate("/Admin-Dashboard/Teachers/add-teacher/add-availability", {
        state: { formData },
      });
    } else {
      // Display toast notification for missing fields
      toast.error(
        `Please fill in all required fields: ${missingFields.join(", ")}`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  return (
    <>
      {/* <AdminNav /> */}
      <div className="Add_Teachers_main_div">
        <h5>Add New Teacher</h5>
        <form>
          {/* Image div */}
          <div className="Addteacherimage_box">
            {formData.Profile_Image?.map((md, index) => {
              return (
                <div
                  className="col-6 col-sm-6 col-lg-3 mt-2 mt-md-0 mb-md-0 mb-2 "
                  key={index}
                >
               
                    <img
                      className="w-100 active"
                      src={"https://ik.imagekit.io/8s3jwexmv/" + md}
                    />
         
                  <span
                    className="badge bg-danger badge-pill badge-round ml-1"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleImageRemoval(md);
                    }}
                  >
                    Delete
                  </span>
                </div>
              );
            })}
          </div>
          {/* Image input Links */}
          {formData.Profile_Image?.length < 10 && (
            <div className="col-6 col-sm-6 col-lg-3 mt-2 mt-md-0 mb-md-0 mb-2">
              <div className="card-body">
                <p style={{ fontSize: "12px" }} className="card-text">
                  Select image file to upload.
                </p>
                {/* Basic file uploader */}
                <input
                  className="form-control"
                  encType="multipart/form-data"
                  type="file"
                  name="images"
                  id="formFile"
                  onChange={handleFileUpload}
                />
              </div>
            </div>
          )}
          <div className="form_group_div  mt-2">
            {/* Teacher Links */}
            <div className="form-group w-25">
              {/* <label htmlFor="teacherName"></label> */}
              <input
                type="text"
                className="form-control"
                id="teacherName"
                name="teacherName"
                placeholder="Teacher Name"
                value={formData.teacherName}
                onChange={handleChange}
                required
              />
            </div>
            {/* Description Links */}
            <div className="form-group w-25 mx-5">
              {/* <label htmlFor="description"></label> */}
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            {/* Phone number Links */}
            <div className="form-group w-25 ">
              {/* <label htmlFor="phoneNumber"></label> */}
              {/* <input
                type="number"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                placeholder='Phone Number'
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              /> */}
              <PhoneInput
                country={"us"}
                className="mt-2"
                value={formData.phoneNumber}
                onChange={(phone, country, e, formattedValue) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    phoneNumber: formattedValue,
                  }));
                }}
                inputProps={{
                  name: "phoneNumber",
                  required: true,
                  autoFocus: true,
                  className: "form-control teacherphonenumberinput",
                }}
                required
              />
            </div>
          </div>
          <div className="form_group_div mt-2">
            {/* Password Links */}
            <div className="form-group w-25 ">
              {/* <label htmlFor="Password"></label> */}
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {/* Address Links */}
            <div className="form-group w-25 mx-5">
              {/* <label htmlFor="address"></label> */}
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            {/* Short Title Links */}
            <div className="form-group w-25 ">
              {/* <label htmlFor="shortTitle"></label> */}
              <input
                type="text"
                className="form-control"
                id="shortTitle"
                placeholder="shortTitle"
                name="shortTitle"
                value={formData.shortTitle}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form_group_div mt-2">
            {/* Course Assign Links */}
            <div className="form-group">
              <label htmlFor="Status">Select Courses</label> &nbsp;&nbsp;
              {courses?.map((values) => (
                <div key={values._id} className="form-check">
                  <input
                    type="checkbox"
                    id={values._id}
                    value={values._id}
                    checked={formData.coursesAssign.includes(values._id)}
                    onChange={() => handleCheckboxChange(values._id)}
                    className="form-check-input"
                  />
                  <label htmlFor={values._id} className="form-check-label">
                    {values.Course_Name}
                  </label>
                </div>
              ))}
            </div>
            {/* Purchase Links */}
            <div className="form-group w-25 mx-5">
              {/* <label htmlFor="purchasePrice"></label> */}
              <input
                type="number"
                className="form-control"
                id="purchasePrice"
                name="purchasePrice"
                placeholder="Purchase Price"
                value={formData.purchasePrice}
                onChange={handleChange}
                required
              />
            </div>
            {/* Purchase Links */}
            <div className="form-group w-25 ">
              {/* <label htmlFor="purchasePrice"></label> */}
              <input
                type="Email"
                className="form-control"
                id="Email"
                name="Email"
                placeholder="Email"
                value={formData.Email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {/* <label>Social Links</label> */}
          <div className="form-group w-100 mt-2 d-flex justify-content-between">
            {formData.socialLinks.map((socialLink, index) => (
              <div key={index} className="social-link-item w-25 ">
                <div className="form-group justify-content-between">
                  {/* <label>{socialLink.platform}</label> */}
                  <input
                    type="text"
                    className="form-control "
                    placeholder={socialLink.platform}
                    value={socialLink.link}
                    onChange={(e) =>
                      handleSocialLinkChange(
                        index,
                        socialLink.platform,
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Availability Links */}
          {/* <div className="form-group mt-2">
          <label htmlFor="availability">Availability</label>
          {formData.availability.map((slot, index) => (
            <div key={index} className="availability-item p-2 mb-2">
              <div className="form-group">
                <label>Date</label>
                <DatePicker
                  className='mx-2 form-control'
                  selected={slot.Date}
                  onChange={(date) => handleDateChange(date, index)}
                />
              </div>
              <div className="form-group">
                <label>Start Time</label>
                <TimePicker
                    value={slot.Time[0]?.Start_time}
                    onChange={(time) => handleTimeChange(time, index, true)}
                  />
              </div>
              <div className="form-group">
                <label>End Time</label>
                <TimePicker
                    value={slot.Time[0]?.End_time}
                    onChange={(time) => handleTimeChange(time, index, false)}
                  />
              </div>
              <button
                type="button"
                className="btn btn-danger btn-delete-teacher delete-time"
                onClick={() => handleDeleteTime(index)}
              >
                Delete
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-outline-success btn-add-teacher add-time mb-2"
            onClick={handleAddTime}
          >
            Add Time
          </button>
        </div> */}
          {/* Social Links */}
          {/* Submit button */}
          <button
            onClick={NextHandler}
            className="btn btn-outline-success mt-3 w-100"
          >
            NEXT
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default AdminAddTeachers;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { GetTeachers } from '../../../store/actions/teachersActions';
import { Getcourses } from '../../../store/actions/coursesActions';
import { fetchPackage, updatePackage } from '../../../store/actions/packagesActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminNav from '../AdminNav';

const AdminEditPackages = () => {
  const { PackageID } = useParams();
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.teachers.Teacherslist);
  const courses = useSelector((state) => state.courses.courseslist);
  const currentPackage = useSelector((state) => state.packages.currentPackage);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Package_Name:"",
    Teachers_ID: [],
    Course_ID: [],
    // Package_Amount: 0,
    Number_of_Lectures: 0,
    Free_Package:false
  });

  useEffect(() => {
    dispatch(GetTeachers());
    dispatch(Getcourses());
    dispatch(fetchPackage(PackageID));
    // console.log(PackageID) // Fetch the specific package for editing
  }, [dispatch, PackageID]);

  useEffect(() => {
    if (currentPackage) {
      setFormData({
        Package_Name:currentPackage.Package_Name || "",
        Teachers_ID: currentPackage.Teacher_IDs || [], // assuming Teacher_IDs is an array
        Course_ID: currentPackage.Course_IDs || [], // assuming Course_IDs is an array
        // Package_Amount: currentPackage.Package_Amount || 0,
        Number_of_Lectures: currentPackage.Number_of_Lectures || 0,
        Free_Package:currentPackage.Free_Package || false
      });
    }
  }, [currentPackage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'Teachers_ID' || name === 'Course_ID') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: [value],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if any of the fields are empty
    if (!formData.Package_Name || !formData.Teachers_ID.length || !formData.Course_ID.length ||  !formData.Number_of_Lectures) { 
      // !formData.Package_Amount ||
      // Find the name of the empty field
      const emptyFieldName = !formData.Package_Name ? 'Package Name' :
        !formData.Teachers_ID.length ? 'Teachers' :
        !formData.Course_ID.length ? 'Courses' : 'Number of Lectures';
        // !formData.Package_Amount ? 'Purchase Price' :
  
      // Display a toast with the name of the empty field
      toast.error(`Please fill in the ${emptyFieldName} field`);
      return;
    }
  
    try {
      await dispatch(updatePackage({ PackageID, formData }));
      // Display a success toast after successful submission
      toast.success('Package updated successfully');
    } catch (error) {
      console.error('Error editing package:', error);
      // Display an error toast if there's an error
      toast.error('Error editing package');
    }
  
    // Redirect to the desired location
    navigate('/Admin-Dashboard/Packages');
  };

  const handleTeacherCheckboxChange = (teacherId) => {
    setFormData((prevData) => {
      const isSelected = prevData.Teachers_ID.includes(teacherId);
  
      if (isSelected) {
        return {
          ...prevData,
          Teachers_ID: prevData.Teachers_ID.filter((teacher) => teacher !== teacherId),
        };
      } else {
        return {
          ...prevData,
          Teachers_ID: [...prevData.Teachers_ID, teacherId],
        };
      }
    });
  };
  
  const handleCourseCheckboxChange = (courseId) => {
    setFormData((prevData) => {
      const isSelected = prevData.Course_ID.includes(courseId);
  
      if (isSelected) {
        return {
          ...prevData,
          Course_ID: prevData.Course_ID.filter((course) => course !== courseId),
        };
      } else {
        return {
          ...prevData,
          Course_ID: [...prevData.Course_ID, courseId],
        };
      }
    });
  };

  const handleFreeTrialCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setFormData({
      ...formData,
      Free_Package: isChecked,
    });
  };

  return (
    <>
      <AdminNav />
      <div className="Edit_Package_main_div">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        <form className='w-100' onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="Package_Name">Name of the Package</label>
            <input
              type="text"
              className="form-control"
              id="Package_Name"
              name="Package_Name"
              value={formData.Package_Name}
              onChange={handleChange}
              required
            />
          </div>
            <div className="form-group">
            <label htmlFor="Teachers_ID">Select Teachers</label> &nbsp;&nbsp;
              {teachers?.map((values) => (
                <div key={values._id} className="form-check">
                  <input
                    type="checkbox"
                    id={values._id}
                    value={values._id}
                    checked={formData.Teachers_ID.includes(values._id)}
                    onChange={() => handleTeacherCheckboxChange(values._id)}
                    className="form-check-input"
                  />
                  <label htmlFor={values._id} className="form-check-label">
                    {values.Username}
                  </label>
                </div>
              ))}
            </div>
            <div className="form-group">
            <label htmlFor="Course_ID">Select Course</label> &nbsp;&nbsp;
              {courses?.map((values) => (
                <div key={values._id} className="form-check">
                  <input
                    type="checkbox"
                    id={values._id}
                    value={values._id}
                    checked={formData.Course_ID.includes(values._id)}
                    onChange={() => handleCourseCheckboxChange(values._id)}
                    className="form-check-input"
                  />
                  <label htmlFor={values._id} className="form-check-label">
                    {values.Course_Name}
                  </label>
                </div>
              ))}
            </div>
          {/* <div className="form-group">
            <label htmlFor="Package_Amount">Purchase Price</label>
            <input
              type="number"
              className="form-control"
              id="Package_Amount"
              name="Package_Amount"
              value={formData.Package_Amount}
              onChange={handleChange}
              required
            />
          </div> */}

          <div className="form-group">
            <label htmlFor="Number_of_Lectures">Number of Lectures</label>
            <input
              type="number"
              className="form-control"
              id="Number_of_Lectures"
              name="Number_of_Lectures"
              value={formData.Number_of_Lectures}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-check form-switch mt-4">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              checked={formData.Free_Package}
              onChange={handleFreeTrialCheckboxChange}
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              Make This Package a Free Trial
            </label>
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-outline-success mt-3">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminEditPackages;

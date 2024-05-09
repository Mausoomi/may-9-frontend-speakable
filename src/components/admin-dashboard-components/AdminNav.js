import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchBookingbyStudentUsername } from "../../store/actions/bookingActions";
import { SearchCoursebyName } from "../../store/actions/coursesActions";
import { SearchEnquirybyStudentUsername } from "../../store/actions/enquiryActions";
import {
  Notifications,
  NotificationsOfAccountant,
  NotificationsOfAdmin,
  NotificationsOfTeacher,
} from "../../store/actions/notificationActions";
import { SearchPackagebyPackageName } from "../../store/actions/packagesActions";
import { SearchPaymentbyStudentUsername } from "../../store/actions/paymentActions";
import { SearchStudentbyUsername } from "../../store/actions/studentsActions";
import { SearchTeacherbyUsername } from "../../store/actions/teachersActions";

const AdminNav = () => {
  const user = useSelector((state) => state.students.user);
  const studentNotifications = useSelector(
    (state) => state.notifications.Student_Notifications
  );
  const allNotifications = useSelector(
    (state) => state.notifications.All_Notifications
  );
  const teacherNotifications = useSelector(
    (state) => state.notifications.Teacher_Notifications
  );
  const accountantNotifications = useSelector(
    (state) => state.notifications.Accountant_Notifications
  );

  const [notifyNumber, setNotifyNumber] = useState(0);
  const [Search_Input, setSearch_Input] = useState('')
  const [showSearchBar, setShowSearchBar] = useState(true)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  let currentLocation = location.pathname;


  useEffect(() => {
    const fetchNotifications = async () => {
      let notificationsAction;
      switch (user.UserType) {
        case "student":
          notificationsAction = Notifications(user._id);
          break;
        case "teacher":
          notificationsAction = NotificationsOfTeacher(user._id);
          break;
        case "accountant":
          notificationsAction = NotificationsOfAccountant();
          break;
        case "admin":
          notificationsAction = NotificationsOfAdmin();
          break;
        default:
          break;
      }

      if (notificationsAction) {
        await dispatch(notificationsAction);
      }
    };

    fetchNotifications();
  }, [dispatch, user]);

  useEffect(() => {
    switch (user.UserType) {
      case "student":
        setNotifyNumber(studentNotifications.length);
        break;
      case "teacher":
        setNotifyNumber(teacherNotifications.length);
        break;
      case "accountant":
        setNotifyNumber(accountantNotifications.length);
        break;
      case "admin":
        setNotifyNumber(allNotifications.length);
        break;
      default:
        break;
    }
  }, [
    studentNotifications,
    allNotifications,
    teacherNotifications,
    accountantNotifications,
  ]);

  const notifyHandler = () => {
    let destination;
    switch (user.UserType) {
      case "student":
        destination = "/Student-dashboard/NotificationTab";
        break;
      case "teacher":
        destination = "/Teacher-dashboard/NotificationTab";
        break;
      case "accountant":
        destination = "/Accontant-Dashboard/NotificationTab";
        break;
      case "admin":
        destination = "/Admin-Dashboard/NotificationTab";
        break;
      default:
        break;
    }

    if (destination) {
      navigate(destination);
    }
  };

  // const SearchbarHandler = () => {
  //   // console.log(currentLocation)
  //   const trimmedInput = Search_Input.replace(/^\s+/, '');
  //   if (trimmedInput.length > 0 && currentLocation === '/Admin-Dashboard/Teachers') {
  //     dispatch(SearchTeacherbyUsername(trimmedInput));
    
  //   }
  //   if (trimmedInput.length > 0 && currentLocation === '/Admin-Dashboard/Students') {
  //     dispatch(SearchStudentbyUsername(trimmedInput));
   
  //   }
  //   // /Admin-Dashboard/Courses
  //   if (trimmedInput.length > 0 && currentLocation === '/Admin-Dashboard/Courses') {
  //     dispatch(SearchCoursebyName(trimmedInput));
   
  //   }
  //   // /Admin-Dashboard/Bookings
  //   if (trimmedInput.length > 0 && currentLocation === '/Admin-Dashboard/Bookings') {
  //     dispatch(SearchBookingbyStudentUsername(trimmedInput));
      
  //   }
  //   // /Admin-Dashboard/Enquirys
  //   if (trimmedInput.length > 0 && currentLocation === '/Admin-Dashboard/Enquirys') {
  //     dispatch(SearchEnquirybyStudentUsername(trimmedInput));
    
  //   }
  //   // /Admin-Dashboard/Payments
  //   if (trimmedInput.length > 0 && currentLocation === '/Admin-Dashboard/Payments') {
  //     dispatch(SearchPaymentbyStudentUsername(trimmedInput));
   
  //   }
  //   // /Admin-Dashboard/Packages
  //   if (trimmedInput.length > 0 && currentLocation === '/Admin-Dashboard/Packages') {
  //     dispatch(SearchPackagebyPackageName(trimmedInput));
   
  //   }

  // };

const SearchbarHandler = () => {
  const trimmedInput = Search_Input.trim(); // Using trim() directly for trimming whitespace

  if (trimmedInput.length > 0) {
    const inputLower = trimmedInput.toLowerCase(); // Convert input to lowercase for case-insensitive comparison

    // Convert currentLocation to lowercase for case-insensitive comparison
    const locationLower = currentLocation.toLowerCase();

    // Dispatch actions based on the lowercase currentLocation
    switch (locationLower) {
      case "/admin-dashboard/teachers":
        dispatch(SearchTeacherbyUsername(inputLower));
        break;
      case "/admin-dashboard/students":
        dispatch(SearchStudentbyUsername(inputLower));
        break;
      case "/admin-dashboard/courses":
        dispatch(SearchCoursebyName(inputLower));
        break;
      case "/admin-dashboard/bookings":
        dispatch(SearchBookingbyStudentUsername(inputLower));
        break;
      case "/admin-dashboard/enquirys":
        dispatch(SearchEnquirybyStudentUsername(inputLower));
        break;
      case "/admin-dashboard/payments":
        dispatch(SearchPaymentbyStudentUsername(inputLower));
        break;
      case "/admin-dashboard/packages":
        dispatch(SearchPackagebyPackageName(inputLower));
        break;
      default:
        // Handle default case or do nothing
        break;
    }
  }
};

  useEffect(() => {
    setShowSearchBar(currentLocation !== '/Admin-Dashboard/Dashboard');
  }, [currentLocation]);

  return (
    <>
      {showSearchBar ?
        <div className="Admin-Dashboard_main_right_nav_div">
          <div className="Admin-Dashboard_nav_left_div">
            {/* <i className="bi bi-text-left"></i> */}
            <i
              style={{ cursor: "pointer" }}
              onClick={notifyHandler}
              className="bi bi-bell-fill"
            ></i>
            <span
              style={{ fontWeight: "900", fontSize: "14px" }}
              className="text-danger"
            >
              {notifyNumber}
            </span>
            <i className="bi bi-envelope-fill"></i>
            {/* <i className="bi bi-calendar3"></i> */}
          </div>
          <div className="Admin-Dashboard_nav_search_div">
            <i className="bi bi-search"></i>
            <input
              name="search_Input"
              value={Search_Input}
              onChange={(e) => setSearch_Input(e.target.value)}
              onKeyUp={SearchbarHandler}
              placeholder="Search by Teacher, Student, Fees more details..."
            />
          </div>
          <div className="Admin-Dashboard_nav_right_div">
            <div className="Admin-Dashboard_nav_right_Name_div">
              <span>{user?.Username}</span>
            </div>
            <div className="Admin-Dashboard_nav_right_img_div">
              <img
                src={`https://ik.imagekit.io/8s3jwexmv/${user?.Profile_Image || "default-profile.jpg"
                  }`}
                alt="user"
              />
            </div>
          </div>
        </div> :
        ""}

    </>

  );
};

export default AdminNav;

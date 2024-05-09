// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Signin_user } from "../store/actions/studentsActions";
// import { Link } from "react-router-dom";
// import FillEmailPopup from "./FillEmailPopup";

// const SigninFormPopup = ({ handleClose }) => {
//   const dispatch = useDispatch();
//   const [Username, setUsername] = useState("");
//   const [Password, setPassword] = useState("");
//   const [FillEmail, setFillEmail] = useState(false);

//   const SubmitHandler = (e) => {
//     e.preventDefault();
//     dispatch(
//       Signin_user({
//         Username: Username,
//         Password: Password,
//       })
//     );

//     // console.log(Username)
//     // console.log(Password)
//   };

//   const closeFillEmailFormPopup = () => {
//     setFillEmail(false);
//   };

//   const openFillEmailFormPopup = () => {
//     setFillEmail(true);
//   };
//   return (
//     <>
//       <div className="form-popup">
//         <div className="form-popup-content">
//           {/* Add your signup form fields here, for example: */}
//           <form onSubmit={SubmitHandler}>
//             <h5>Signin</h5>
//             <div className="form-group-sign ">
//               {/* <label htmlFor="username">Username:</label> */}
//               <input
//                 type="text"
//                 id="username"
//                 name="username"
//                 placeholder="Username"
//                 value={Username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 placeholder="Password"
//                 value={Password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <label>
//               Forgot Password ?
//               <Link onClick={openFillEmailFormPopup}> Recover Now</Link>
//             </label>
//             {/* Add other form fields as needed */}
//             <div className="d-flex mt-4">
//               <button type="submit" className="btn btn-outline-success mx-3">
//                 Submit
//               </button>
//               <button
//                 onClick={handleClose}
//                 className="btn btn-outline-success mx-3"
//               >
//                 Close
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       {FillEmail && <FillEmailPopup handleClose={closeFillEmailFormPopup} />}
//     </>
//   );
// };

// export default SigninFormPopup;


import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Signin_user } from "../store/actions/studentsActions";
import { Link } from "react-router-dom";
import FillEmailPopup from "./FillEmailPopup";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const SigninFormPopup = ({ handleClose }) => {
  const dispatch = useDispatch();
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [FillEmail, setFillEmail] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const SubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      Signin_user({
        Username: Username,
        Password: Password,
      })
    );

    // console.log(Username)
    // console.log(Password)
  };

  const closeFillEmailFormPopup = () => {
    setFillEmail(false);
  };

  const openFillEmailFormPopup = () => {
    setFillEmail(true);
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <div className="form-popup">
        <div className="form-popup-content">
          {/* Add your signup form fields here, for example: */}
          <form onSubmit={SubmitHandler}>
            <h5>Signin</h5>
            <div className="form-group-sign ">
              {/* <label htmlFor="username">Username:</label> */}
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className="text-end">
                hide{" "}
                <span onClick={togglePasswordVisibility}>
                  {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </label>

              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <label>
              Forgot Password ?
              <Link onClick={openFillEmailFormPopup}> Recover Now</Link>
            </label>
            {/* Add other form fields as needed */}
            <div className="d-flex mt-4">
              <button type="submit" className="btn btn-outline-success mx-3">
                Submit
              </button>
              <button
                onClick={handleClose}
                className="btn btn-outline-success mx-3"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
      {FillEmail && <FillEmailPopup handleClose={closeFillEmailFormPopup} />}
    </>
  );
};

export default SigninFormPopup;


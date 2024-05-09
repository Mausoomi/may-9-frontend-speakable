import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { fetch5courses } from '../../store/actions/coursesActions';

const Courses = () => {
  const courses = useSelector((state) => state.courses.courseslist);
  // console.log(courses)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch5courses());
  }, [dispatch]);

  // Slick slider settings
  // const sliderSettings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   // // slidesToShow: courses.length <= 3 ? courses.length : 3, // Adjust the number of slides to show based on courses length
  //   // slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 2000,
  //   // dots: true,
  //   // infinite: true,
  //   // speed: 500,
  //   slidesToShow: 4,
  //   slidesToScroll: 4,
  // };

  var sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 764,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const course_main_lower_div = {
    padding: "50px",
    

  }

  return (
    <div style={course_main_lower_div} id="Courses">
      <div className="">
        <Slider {...sliderSettings}>
          {courses?.map((course, index) => (
            <div key={index}>
              <div className="box-slider-card">
                <div className="course_main-Box">
                  <div className="Home_main_lower_box_circle">
                    <img
                      src={`https://ik.imagekit.io/8s3jwexmv/${course.Course_Images}`}
                      alt=""
                    />
                  </div>

                  <Link
                    className="course-name Home_main_lower_box_Link"
                    to={`/CourseDetails/${course._id}`}
                  >
                    <p>{course.Course_Name}</p>
                  </Link>
                  <div className="text-break">{course.Description}</div>

                  <p className="text-success">${course.Purchase_Price}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
  // return (
  //   <div  style={course_main_lower_div} id='Courses'>
  //     <div className='d-flex justify-content-center  align-items-center Slider_Div'>
  //     <Slider {...sliderSettings}>
  //       {courses.map((course, index) => (
  //         <div key={index} className='justify-content-center  align-items-center Home_main_lower_box d-flex'>
  //           <div className='Home_main_lower_box_circle'>
  //             <img src={`https://ik.imagekit.io/8s3jwexmv/${course.Course_Images}`} alt='' />
  //           </div>
  //           <p>hi</p>
  //           <Link className='Home_main_lower_box_Link' to={`/CourseDetails/${course._id}`}>{course.Course_Name}</Link>
  //           <p>{course.Description}</p>
  //           <p className='text-success'>${course.Purchase_Price}</p>
  //         </div>
  //       ))}
  //     </Slider>
  //     </div>
  //   </div>
  // );
};

export default Courses;

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetch5courses } from '../../store/actions/coursesActions';
// import { Link } from 'react-router-dom';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// const Courses = () => {
//   const courses = useSelector((state) => state.courses.courseslist);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetch5courses());
//   }, [dispatch]);

//   // Slick slider settings
//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: courses.length <= 3 ? courses.length : 3, // Adjust the number of slides to show based on courses length
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//   };

//   return (
//     <div className='course-main-lower-div'>
//       <div className='slider-div'>
//         <Slider {...sliderSettings}>
//           {courses.map((course, index) => (
//             <div key={index} className='home-main-lower-box'>
//               <div className='home-main-lower-box-circle'>
//                 <img src={`https://ik.imagekit.io/8s3jwexmv/${course.Course_Images}`} alt='' />
//               </div>
//               <Link className='home-main-lower-box-link' to={`/CourseDetails/${course._id}`}>{course.Course_Name}</Link>
//               <p>{course.Description}</p>
//               <p className='text-success'>${course.Purchase_Price}</p>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// };

// export default Courses;
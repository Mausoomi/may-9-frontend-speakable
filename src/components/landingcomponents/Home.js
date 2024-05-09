import React from 'react';
import Slider from 'react-slick';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

const Home = () => {
  // Carousel settings
  const carouselSettings = {
    dots: true,
   
    // infinite: true,
    // speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };





  return (
    <div className='Home_main_div col-md-12' id='Home'>
      <dispatchEvent>
        <Slider {...carouselSettings}>
          {/* Add your carousel slides here */}
          <div className='top-sliderMain'>
            <div className='Home_main_upper_div_col1'>
              <div className=' Home_text_div_col1 '>
                <h1>Efficient Learning Methods</h1>
                <h3>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor <br />
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                </h3>
                <button className='btn btn-outline-light  rounded-5'>Let's chat  </button>
              </div>
            </div>
          </div>
          <div className='top-sliderMain'>
            <div className='Home_main_upper_div_col2'>
              <div className='col-md-10  Home_text_div_col2 '>
                <h1>Distance Learning <br /> Education Center</h1>
                <h3>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor <br />
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                </h3>
                <button className='btn btn-outline-light rounded-5 '>Discover more</button>
              </div>
            </div>
          </div>

          <div className='top-sliderMain'>
            <div className='Home_main_upper_div_col3'>
              <div className=' Home_text_div_col3 '>
                <h1>Start your journey with our<br />practical courses</h1>
                <h3>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor <br />
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                </h3>
                <button className='btn btn-outline-light rounded-5 '>Take a course</button>
              </div>
            </div>
          </div>
          {/* Add more slides as needed */}
        </Slider>
      </dispatchEvent>
    </div>
  )
}

export default Home
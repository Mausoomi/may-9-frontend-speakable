import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Booknow.css";
import { getOrderDetails } from "../../store/actions/paymentActions";
import { useReactToPrint } from "react-to-print"; // Assuming you're using 'react-to-print'
import { useNavigate } from "react-router-dom";

const Booknow = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderData = useSelector((state) => state.payments.orderData);
  console.log(orderData);
  const componentRef = useRef();
  const user = useSelector((state) => state.students.user);
  const NameUser = user?.Username;


  useEffect(() => {
    // Function to get cookie value by name
    const getCookie = (name) => {
      const cookieString = document.cookie;
      const cookies = cookieString.split("; ");

      for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split("=");
        if (cookieName.trim() === name) {
          return decodeURIComponent(cookieValue);
        }
      }

      return null;
    };

    const orderId = getCookie("orderId");
    if (orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch]); // Only dispatch when dispatch function changes

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const generatePDF = () => {
    handlePrint();
    // Add logic to generate PDF here
  };

  const HomeNavigator = () => {
    navigate("/Student-dashboard/dash");
  };


    const convertStringToObject = (str) => {
      // Split the string into key-value pairs
      const pairs = str.split(",");

      // Construct an object from the key-value pairs
      const obj = {};
      pairs.forEach((pair) => {
        const [key, value] = pair.split(":");
        obj[key.trim()] = value.trim();
      });

      return obj;
    };


  return (
    <div className="Booknow_main_div bg-light d-flex flex-column justify-content-center align-items-center  ">
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        ref={componentRef}
      >
        {orderData && (
          <>
            {orderData?.properties?.map((val, index) => (
              <div key={index}>
                {val.name} - {val.value}
              </div>
            ))}
          </>
        )}
        {orderData && (
          <>
            {orderData?.orders?.map((val, index) => (
              <div className="text-center mt-3" key={index}>
                {val.status === "COMPLETED" ? (
                  <div className="text-success fs-5 fbold ">{val.status}</div>
                ) : (
                  <div className="text-danger">{val.status}</div>
                )}

                <div className="successDiv">
                  <p className="Paymessage">
                    <span>{NameUser}</span>, Thank you 😊 for purchasing the{" "}
                    <span>
                      {val.description}
                    </span>
                  </p>
                </div>
                <div className="d-flex justify-content-center">
                  <p>OrderId- </p>
                  <p className="fw-bold justify-content-center">
                    {val.orderId}
                  </p>
                </div>
                <div className="d-flex justify-content-center">
                  <p>Merchant PosId- </p>
                  <p className="fw-bold">{val.merchantPosId}</p>
                </div>
                <div className="d-flex justify-content-center">
                  <p>TotalAmount- </p>
                  <p className="fw-bold">{val.totalAmount}</p>
                </div>
                <div className="d-flex justify-content-center">
                  <p>CurrencyCode- </p>
                  <p className="fw-bold">{val.currencyCode}</p>
                </div>
                {/* <div className="d-flex justify-content-center">
                  <p>Adress- </p>
                  <p className="fw-bold">{val.additionalDescription}</p>
                </div> */}
                <div className="d-flex justify-content-center">
                  <p>Address- </p>
                  {/* Convert additionalDescription to object */}
                  <p className="fw-bold">
                    {val.additionalDescription && (
                      <>
                        {Object.entries(
                          convertStringToObject(val.additionalDescription)
                        ).map(([key, value]) => (
                          <div key={key}>
                            {key}: {value}
                          </div>
                        ))}
                      </>
                    )}
                  </p>
                </div>
                {/* <div className="mt-3"> */}
                  {/* <span className="fs-5 ">Products Information</span> */}
                  <div className="d-flex justify-content-center">
                    <p> Product ID - </p>
                    <p className="fw-bold">
                      {/* {""}
                      {val.products?.map((product, index) => {
                        return <>{product.name}</>;
                      })} */}
                      {val.description}
                    </p>
                  </div>
                  <div className="d-flex justify-content-center">
                    <p> Product Price -</p>
                    <p className="fw-bold">
                      {" "}
                      {""}
                      {val.products?.map((product, index) => {
                        return <>{product.unitPrice}</>;
                      })}
                    </p>
                  </div>
                </div>
              // </div>
            ))}
            <div>{orderData?.status?.statusDesc}</div>
          </>
        )}
      </div>
      <div>
        <button className="btn btn-outline-primary mt-3" onClick={generatePDF}>
          Download Reciept
        </button>
        <button
          className="btn btn-outline-primary mt-3 mx-3"
          onClick={HomeNavigator}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Booknow;

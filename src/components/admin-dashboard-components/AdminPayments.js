import React, { useEffect } from "react";
import AdminNav from "./AdminNav";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllpayments } from "../../store/actions/paymentActions";

const AdminPayments = () => {
  const dispatch = useDispatch();
  const payments = useSelector((state) => state.payments.Allpaymentlist);
  // console.log(payments);

  useEffect(() => {
    dispatch(fetchAllpayments());
  }, [dispatch]);

  return (
    <>
      <AdminNav />
      <div className="Payments_mainPage_style">
        <div className="Payments_header_style">
          <h6 className="text-dark">Payments Table</h6>
        </div>
        <div className="Payments_list_style d-flex flex-wrap flex-row">
          {payments && payments.length > 0 ? (
            <table className="table table-hover table-responsive table-borderless">
              <thead className="table-transparent">
                <tr>
                  <th className="th">Package Name</th>
                  <th className="th">Course Name</th>
                  <th className="th">Teacher's Name</th>
                  <th className="th">Student Name</th>
                  <th className="th">Status</th>
                  <th className="th">Amount</th>
                  <th className="th">Method</th>
                  {/* <th className='th'>Scheduled Date</th> */}
                  {/* Add more table headers based on your schema */}
                </tr>
              </thead>
              <tbody>
                {payments?.map((payment) => (
                  <tr
                    style={{
                      boxShadow:
                        "0px 0px 1px rgba(0, 0, 0, 0.1), 0 0px 1px 0 rgba(0, 0, 0, 0.1)",
                      borderRadius: "8px",
                    }}
                    key={payment?._id}
                  >
                    <td className="td">{payment?.Package_ID?.Package_Name}</td>
                    <td className="td">
                      {payment?.Package_ID?.Course_IDs?.map(
                        (val) => val.Course_Name
                      )}
                    </td>
                    <td className="td">
                      {payment?.Package_ID?.Teacher_IDs?.map(
                        (val) => val.Username
                      )}
                    </td>
                    <td className="td">{payment?.Student_ID?.Username}</td>
                    <td className="td">{payment?.Status}</td>
                    <td className="td">{payment?.Package_ID?.Package_Amount}</td>
                    <th className="td">{payment?.Method}</th>
                    {/* <td className='td'>{payment.Booking_ID.Scheduled_Date}</td> */}
                    {/* Add more table data based on your schema */}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No payments available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPayments;

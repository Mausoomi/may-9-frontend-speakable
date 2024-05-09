import React, { useEffect, useState } from "react";
import AdminNav from "../admin-dashboard-components/AdminNav";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllpayments } from "../../store/actions/paymentActions";

const AccontantDash = () => {
  const dispatch = useDispatch();
  const PaymentData = useSelector((state) => state.payments.Allpaymentlist);
  const [totalIncome, setTotalIncome] = useState(0);
  const [monthIncome, setMonthIncome] = useState(0);
  const [todayIncome, setTodayIncome] = useState(0);
  // console.log(PaymentData);

  useEffect(() => {
    dispatch(fetchAllpayments());
  }, [dispatch]);

  useEffect(() => {
    // Calculate total income for all payments
    const total = PaymentData.reduce(
      (acc, payment) => acc + payment.Package_ID.Package_Amount,
      0
    );
    setTotalIncome(total);

    // Calculate month income for payments with Scheduled_Date in the current month
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed
    const monthPayments = PaymentData.filter((payment) => {
      const paymentDate = new Date(payment.Booking_ID.Scheduled_Date);
      return paymentDate.getMonth() + 1 === currentMonth;
    });
    const monthTotal = monthPayments.reduce(
      (acc, payment) => acc + payment.Package_ID.Package_Amount,
      0
    );
    setMonthIncome(monthTotal);

    // Calculate today's income for payments with Scheduled_Date as today
    const todayPayments = PaymentData.filter((payment) => {
      const paymentDate = new Date(payment.Booking_ID.Scheduled_Date);
      return (
        paymentDate.getDate() === currentDate.getDate() &&
        paymentDate.getMonth() === currentDate.getMonth() &&
        paymentDate.getFullYear() === currentDate.getFullYear()
      );
    });
    const todayTotal = todayPayments.reduce(
      (acc, payment) => acc + payment.Package_ID.Package_Amount,
      0
    );
    setTodayIncome(todayTotal);
  }, [PaymentData]);

  return (
    <>
      <AdminNav />
      <div className="Dash_mainPage_style">
        <h6>Accountant Dashboard</h6>
        <div className="Admin-Dash_contnet_box">
          <div className="Teacher-Dash_contnet_section_div">
            <img
              className="Admin-Dash_contnet_div_img"
              src="https://cdn-icons-png.flaticon.com/128/1329/1329416.png?uid=R132339509&ga=GA1.2.1941482743.1703671287"
              alt=""
            />
            <span className="Admin-Dash_contnet_head_div_span">
              Total Income
            </span>
            <span style={{ color: "grey" }}>{totalIncome}</span>
          </div>
          <div className="Admin-Dash_contnet_section_div">
            <img
              className="Admin-Dash_contnet_div_img"
              src="https://cdn-icons-png.flaticon.com/128/1329/1329416.png?uid=R132339509&ga=GA1.2.1941482743.1703671287"
              alt=""
            />
            <span className="Admin-Dash_contnet_head_div_span">
              Packages Income
            </span>
            <span style={{ color: "grey" }}>2038</span>
          </div>
          <div className="Admin-Dash_contnet_section_div">
            <img
              className="Admin-Dash_contnet_head_div_img"
              src="https://cdn-icons-png.flaticon.com/128/1329/1329416.png?uid=R132339509&ga=GA1.2.1941482743.1703671287"
              alt=""
            />
            <span className="Admin-Dash_contnet_head_div_span">
              Session Income
            </span>
            <span style={{ color: "grey" }}>2000</span>
          </div>
          <div className="Admin-Dash_contnet_section_div">
            <img
              className="Admin-Dash_contnet_head_div_img"
              src="https://cdn-icons-png.flaticon.com/128/1329/1329416.png?uid=R132339509&ga=GA1.2.1941482743.1703671287"
              alt=""
            />
            <span className="Admin-Dash_contnet_head_div_span">
              Tody's Income
            </span>
            <span style={{ color: "grey" }}>{todayIncome}</span>
          </div>
          <div className="Admin-Dash_contnet_section_div">
            <img
              className="Admin-Dash_contnet_head_div_img"
              src="https://cdn-icons-png.flaticon.com/128/1329/1329416.png?uid=R132339509&ga=GA1.2.1941482743.1703671287"
              alt=""
            />
            <span className="Admin-Dash_contnet_head_div_span">
              Month Income
            </span>
            <span style={{ color: "grey" }}>{monthIncome}</span>
          </div>
        </div>
        <div className="Admin-Dash_list_box">
          <div className="Admin-Dash_student_list_box">
            <h6>Payments</h6>
            <div className="Admin-Dash_student_list_div">
              <table className="table table-hover table-responsive table-borderless">
                <thead className="table-transparent">
                  <tr>
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
                  {PaymentData ? (
                    PaymentData.length > 0 ? (
                      PaymentData.map((payment, index) => (
                        <tr
                          style={{
                            boxShadow:
                              "0px 0px 1px rgba(0, 0, 0, 0.1), 0 0px 1px 0 rgba(0, 0, 0, 0.1)",
                            borderRadius: "8px",
                          }}
                          key={index}
                        >
                          <td className="td">
                            {payment.Package_ID.Course_IDs?.map(
                              (val) => val.Course_Name
                            )}
                          </td>
                          <td className="td">
                            {payment.Package_ID.Teacher_IDs?.map(
                              (val) => val.Username
                            )}
                          </td>
                          <td className="td">{payment.Student_ID.Username}</td>
                          <td className="td">{payment.Status}</td>
                          <td className="td">
                            {payment.Package_ID.Package_Amount.toLocaleString(
                              "en-US",
                              { style: "currency", currency: "USD" }
                            )}
                          </td>
                          <th className="td">{payment.Method}</th>
                          {/* <td className='td'>{payment.Booking_ID.Scheduled_Date}</td> */}
                          {/* Add more table data based on your schema */}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7">No Payments available</td>
                      </tr>
                    )
                  ) : (
                    <tr>
                      <td colSpan="7">Loading...</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="Admin-Dash_student_calender_box">
            <h6>Events - 2023 to 2024</h6>
            <br />
            <Calendar />
          </div>
        </div>
      </div>
    </>
  );
};

export default AccontantDash;

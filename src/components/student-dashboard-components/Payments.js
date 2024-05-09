import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetPaymentsByStudentID } from "../../store/actions/paymentActions";
import AdminNav from "../admin-dashboard-components/AdminNav";

const Payments = () => {
  const student = useSelector((state) => state.students.user);
  // console.log(student._id)
  const dispatch = useDispatch();
  const Payments = useSelector((state) => state.payments.StudentID_Payments);
  console.log(Payments);

  useEffect(() => {
    dispatch(GetPaymentsByStudentID(student._id));
  }, [student._id, dispatch]);

  const handleDownloadInvoice = (path) => {
    // Create an anchor element
    const anchor = document.createElement("a");
    anchor.href = path;
    anchor.download = path.split("/").pop(); // Extracts the file name from the path
    anchor.click(); // Simulate click to trigger download
  };

  return (
    <>
      <AdminNav />
      <div className="Student_mainPage_style">
        <div className="Student_header_style">
          <h6 className="text-dark">Payment Table</h6>
        </div>
        <div className="Student_list_style mt-3">
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
                <th className="th">invoice</th>
                {/* invoice */}
                {/* <th className='th'>Scheduled Date</th> */}
                {/* Add more table headers based on your schema */}
              </tr>
            </thead>
            <tbody>
              {Payments?.map((payment, index) => (
                <tr
                  style={{
                    boxShadow:
                      "0px 0px 1px rgba(0, 0, 0, 0.1), 0 0px 1px 0 rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                  }}
                  key={index}
                >
                  <td className="td">{payment.Package_ID.Package_Name}</td>
                  <td className="td">
                    {payment.Package_ID.Course_IDs.map(
                      (val) => val.Course_Name
                    )}
                  </td>
                  <td className="td">
                    {payment.Package_ID.Teacher_IDs.map((val) => val.Username)}
                  </td>
                  <td className="td">{payment.Student_ID.Username}</td>
                  <td className="td">{payment.Status}</td>
                  <td className="td">{payment.Package_ID.Package_Amount}</td>
                  <td className="td">{payment.Method}</td>
                  <td className="td">
                    {/* Render a clickable link for downloading the invoice */}
                    <a
                      href={payment.invoice}
                      download={payment.invoice.split("/").pop()}
                      onClick={() => handleDownloadInvoice(payment.invoice)}
                    >
                      {payment.invoice}
                    </a>
                  </td>
                  {/* <td className='td'>{payment.Booking_ID.Scheduled_Date}</td> */}
                  {/* Add more table data based on your schema */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Payments;

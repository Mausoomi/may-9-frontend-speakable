import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllpayments } from '../../store/actions/paymentActions'
import AdminNav from '../admin-dashboard-components/AdminNav'
const AccontantPayment = () => {

const dispatch = useDispatch()
const PaymentData = useSelector((state) => state.payments.Allpaymentlist)
// console.log(PaymentData)

useEffect(() => {
  dispatch(fetchAllpayments())
}, [dispatch])

  return (
    <>
    <AdminNav/>
    <div className='Student_mainPage_style'>
    <div className='Student_header_style'>
      <h6 className='text-dark'>Payment Table</h6>
    </div>
    <div className='Student_list_style mt-3'>
      <table className="table table-hover table-responsive table-borderless">
        <thead className='table-transparent'>
          <tr>
            <th className='th'>Course Name</th>
            <th className='th'>Teacher's Name</th>
            <th className='th'>Student Name</th>
            <th className='th'>Status</th>
            <th className='th'>Amount</th>
            <th className='th'>Method</th>
            {/* <th className='th'>Scheduled Date</th> */}
            {/* Add more table headers based on your schema */}
          </tr>
        </thead>
        <tbody>
        {PaymentData ? (
                    PaymentData.length > 0 ? (
                        PaymentData.map((payment, index) => (
                            <tr style={{ boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.1), 0 0px 1px 0 rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}  key={index}>
                                  <td className='td'>{payment.Package_ID.Course_IDs?.map((val)=>val.Course_Name)}</td>
                                  <td className='td'>{payment.Package_ID.Teacher_IDs?.map((val) => val.Username)}</td>
                                  <td className='td'>{payment.Student_ID.Username}</td>
                                  <td className='td'>{payment.Status}</td>                              
                                  <td className='td'>{payment.Package_ID.Package_Amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                                  <th className='td'>{payment.Method}</th>
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
  </>
  )
}

export default AccontantPayment
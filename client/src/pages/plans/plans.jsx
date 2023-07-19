import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import './plans.css'
import {createOrder,checkPayment} from '../../actions/plans.js'

const Plans = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const User = useSelector((state)=> state.currentUserReducer)
  
  function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

async function displayRazorpay(plan) {
  if(User === null){
    alert('Login First')
    navigate('/Auth')
    return;
  }
  if(User.result.plan.length)
  {
    alert('Already subscribed')
    return
  }
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }
    
    const result = await dispatch(createOrder(plan))
    
    if (!result.status) {
        alert(result.data);
        return;
    }
    const { amount, order_id, currency } = result.data.data;
    console.log(result.data.data)
    

    const options = {
        key: "rzp_test_hVN59ozFf4epo2", // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: "Stackoverflow",
        description: "Test Transaction",
        order_id: order_id,
        handler: async function (response) {
          
            const paymentData = {
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                userId: User.result._id,
                planName:plan.planName
            };
            
            const paymentResult = await dispatch(checkPayment(paymentData));
            
            alert(paymentResult.message)
        },
        prefill: {
            name: User.result.name,
            email: User.result.email,
        },
        theme: {
            color: "#61dafb",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}

  const planList = useSelector((state) => state.planReducer) 
  const handleClick = (plan) =>{
    displayRazorpay(plan);
  }
  
  return (
    <div className="home-container-1">
      <LeftSidebar/>
      <div className="home-container-2">
        <div className='plan-container'>
          {
            planList?.map((plan) =>(
              <div className="plan-box">
                <div className="plan-header">{plan.planName}</div>
                <div className="plan-fields">
                <h4>Amount:   </h4>
                <p>Rs. {plan.amount}</p>
                </div>
                <div className="plan-fields">
                  <h4>QuestionLimit: </h4>
                  <p>{plan.noOfQuestions}/day</p>
                </div>
                  <div className="plan-fields">
                  <h4>Validity:</h4>
                  <p>{plan.validity} Days</p>
                </div>
                <button onClick={()=>handleClick(plan)}>Suscribe</button>
              </div>
            ))
          }
                  
                  
        </div>
        </div>
        </div>
  
  )
}

export default Plans

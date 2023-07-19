import Razorpay from 'razorpay'
import crypto from 'crypto'


const razorpayInstance = new Razorpay({
  
    // Replace with your key_id
    key_id: "rzp_test_hVN59ozFf4epo2",
  
    // Replace with your key_secret
    key_secret: "PlOMODvGZTbfikXZLFDbyfTV"
});

export const createServerOrder = async (amount) =>{
    var options = {
        amount: amount*100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
      };
      
      try {
        const responce = await razorpayInstance.orders.create(options);
        return {status:1, payload:{ order_id: responce.id,currency: responce.currency,amount: responce.amount}}  
      } catch (error) {
        console.log(error)
        return {status:0, payload:error.message}
      }
      
      
}

export const verifyPayment = async({orderCreationId, razorpayPaymentId,razorpaySignature}) =>{
  console.log('verifying Payment')
  const key_secret = "PlOMODvGZTbfikXZLFDbyfTV";
  let hmac = crypto.createHmac('sha256', key_secret);
  hmac.update(orderCreationId + "|" + razorpayPaymentId);
  const generated_signature = hmac.digest('hex');
  console.log(razorpaySignature, generated_signature)
  if(razorpaySignature === generated_signature){
    
    return {status:1, message:"Payment has been verified"}
  }
  else{
    return {status:0, message:"Payment verification failed"}
  }
}
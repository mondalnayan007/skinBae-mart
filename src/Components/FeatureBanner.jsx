import React, { useEffect, useState } from 'react';
import LottieComponent from 'lottie-react';

const Lottie = LottieComponent.default || LottieComponent;

const FeatureBanner = () => {
  const [trustedData, setTrustedData] = useState(null);
  const [truckData, setTruckData] = useState(null);
  const [deliveryData, setDeliveryData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    fetch('/trusted.json').then(res => res.json()).then(data => setTrustedData(data)).catch(err => console.log(err));
    fetch('/truck.json').then(res => res.json()).then(data => setTruckData(data)).catch(err => console.log(err));
    fetch('/delivery.json').then(res => res.json()).then(data => setDeliveryData(data)).catch(err => console.log(err));
    fetch('/payment.json').then(res => res.json()).then(data => setPaymentData(data)).catch(err => console.log(err));
  }, []);

  return (
    <div>
      {/* আপনার দেওয়া গ্রিড স্ট্রাকচার ও ক্লাস হুবহু এক রাখা হয়েছে */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
        
        {/* Card 1 */}
        <div className='flex items-center justify-center gap-3 py-6 px-3 shadow-xl'>
          {/* আইকনের সাইজ w-12 থেকে বাড়িয়ে w-20 (80px) করা হয়েছে */}
          <div className='w-28 h-28 flex-shrink-0 flex items-center justify-center'>
            {trustedData && (
              <Lottie
                animationData={trustedData}
                loop={true}      // অল-টাইম লুপ চালু করা হলো
                autoplay={true}  // পেজ লোডেই অটোমেটিক চলা শুরু হবে
              />
            )}
          </div>
          <div>
            <h3 className='text-xl font-semibold text-gray-600'>100% Original</h3>
            <p className='text-xs text-gray-400 font-bold mt-2'>All Products Sourced Directly</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className='flex items-center justify-center gap-3 py-6 px-3 shadow-xl'>
          <div className='w-28 h-28 flex-shrink-0 flex items-center justify-center'>
            {truckData && (
              <Lottie
                animationData={truckData}
                loop={true}
                autoplay={true}
              />
            )}
          </div>
          <div>
            <h3 className='text-xl font-semibold text-gray-600'>Free Shipping</h3>
            <p className='text-xs text-gray-400 font-bold mt-2'>On Orders Above ৳999</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className='flex items-center justify-center gap-3 py-6 px-3 shadow-xl'>
          <div className='w-28 h-28 flex-shrink-0 flex items-center justify-center'>
            {deliveryData && (
              <Lottie
                animationData={deliveryData}
                loop={true}
                autoplay={true}
              />
            )}
          </div>
          <div>
            <h3 className='text-xl font-semibold text-gray-600'>Cash On Delivery</h3>
            <p className='text-xs text-gray-400 font-bold mt-2'>Order Now, Pay on Delivery</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className='flex items-center justify-center gap-3 py-6 px-3 shadow-xl'>
          <div className='w-28 h-28 flex-shrink-0 flex items-center justify-center'>
            {paymentData && (
              <Lottie
                animationData={paymentData}
                loop={true}
                autoplay={true}
              />
            )}
          </div>
          <div>
            <h3 className='text-xl font-semibold text-gray-600'>Digital Payments</h3>
            <p className='text-xs text-gray-400 font-bold mt-2'>via • bKash • Nagad • SSLCommerz</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FeatureBanner;
// import React from 'react'
// import AdSense from "react-adsense";

// function Adsense() {
//   return (
//     <div className="google-ads" style={{ height: "3rem" }}>
//       {/* <AdSense.Google
//         client="ca-pub-1841684641884364"
//         slot="8150407392"
//         style={{ display: "block", height: "5rem" }}
//         layout="in-article"
//         format="fluid"
//       /> */}
    
//     hello
    
    
        
//     </div>
//   );
// }

// export default Adsense


import React, { useEffect } from "react";

const Adsense = (props) => {
  const { dataAdSlot } = props;

  useEffect(() => {
    try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        console.log(window.adsbygoogle);
    } catch (e) {}
  }, []);

  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-1841684641884364"
        data-ad-slot={dataAdSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
    ></ins>
          
          
    </>
  );
};

export default Adsense;
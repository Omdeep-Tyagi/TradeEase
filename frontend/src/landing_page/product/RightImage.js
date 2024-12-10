import React from "react";

function RightImage({ imageURL, productName, productDescription, learnMore }) {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 p-5 ">
          <h1 className="mb-3">{productName}</h1>
          <p>{productDescription}</p>
          <div>
            <a href={learnMore} style={{textDecoration:"none"}}>
              Learn More
              <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        <div className="col-6 ">
          <img src={imageURL} />
        </div>
      </div>
    </div>
  );
}

export default RightImage;
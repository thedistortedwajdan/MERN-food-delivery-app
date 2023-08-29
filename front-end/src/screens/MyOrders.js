import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrders() {
  const [orderData, setOrderData] = useState([]);
  // "http://localhost:5000/api/myOrderData";
  const fetchMyOrder = async () => {
    try {
      const response = await fetch("api/myOrderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("email"),
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setOrderData(data.orderData.order_data);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="container content-below-navbar-myOrders ">
        <div className="row">
          {orderData.map((orderArray, index) => (
            <div key={index}>
              {orderArray.map((item, itemIndex) => (
                <div key={itemIndex}>
                  {item.order_date ? (
                    <div className="d-inline h-100 rounded bg-white text-black fs-4">
                      {item.order_date}
                      {/* <hr /> */}
                    </div>
                  ) : (
                    <div className="col-12 col-md-6 col-lg-3">
                      <div
                        className="card mt-3"
                        style={{
                          width: "16rem",
                          maxHeight: "360px",
                        }}
                      >
                        <img
                          src={item.img}
                          className="card-img-top"
                          alt="..."
                          style={{
                            height: "120px",
                            objectFit: "fill",
                          }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{item.name}</h5>
                          <div
                            className="container w-100 p-0"
                            style={{ height: "38px" }}
                          >
                            <span className="m-1">{item.qty}</span>
                            <span className="m-1">{item.size}</span>
                            <span className="m-1">{item.order_date}</span>
                            <div className="d-inline ms-2 h-100 w-20 fs-5">
                              Rs{item.price}/-
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Footer isSticky={true} />
    </div>
  );
}

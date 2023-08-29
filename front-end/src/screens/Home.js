import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";

export default function Home() {
  const [food_category, setfood_category] = useState([]);
  const [food_items, setfood_items] = useState([]);
  const [search, setsearch] = useState("");
  const handlesearch = (data) => {
    setsearch(data);
  };
  // "http://localhost:5000/api/getFoodData";
  const get_data = async () => {
    try {
      // e.preventDefault();
      let res = await fetch("api/getFoodData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      res = await res.json();
      if (res.success) {
        setfood_items(res.food_data[0]);
        setfood_category(res.food_data[1]);
      } else {
        alert(res.error.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    get_data();
  }, []);

  return (
    <>
      <div className="bg-success">
        <div>
          <Navbar />
        </div>
        <div className="content-below-navbar">
          <Carousel handlesearch={handlesearch} />
        </div>
        <div className="m-3">
          {food_category.length !== 0 ? (
            food_category.map((data) => {
              return (
                <>
                  <div className="row mb-3">
                    <div key={data._id} className="fs-3 m-3">
                      {data.CategoryName}
                    </div>

                    <br />
                    {food_items.length !== 0 ? (
                      food_items
                        .filter(
                          (item) =>
                            item.CategoryName === data.CategoryName &&
                            item.name
                              .toLowerCase()
                              .includes(search.toLocaleLowerCase())
                        )
                        .map((filter_items) => {
                          return (
                            <>
                              <div
                                key={filter_items._id}
                                className="col-12 col-md-6 col-lg-3"
                              >
                                <Card
                                  // name={filter_items.name}
                                  // key={filter_items._id}
                                  foodItem={filter_items}
                                  options={filter_items.options[0]}
                                  // img={filter_items.img}
                                />
                              </div>
                              {/* <hr /> */}
                            </>
                          );
                        })
                    ) : (
                      <div>""</div>
                    )}
                    <hr id="hr" />
                  </div>
                </>
              );
            })
          ) : (
            <div>""</div>
          )}
        </div>
        <div>
          <Footer isSticky={false} />
        </div>
      </div>
    </>
  );
}

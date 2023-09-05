import React, { useEffect, useState } from "react";
import { Footnote } from "../footnote-component/Footnote";
import "./Home.css";
import { getTypes } from "../../service/typeService";
import { Link } from "react-router-dom";

export const Home = () => {
  //Get type
  const types = getTypes();

  // Control size mobile (768) responsive
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
  }, []);

  //Scrollbar always in top
  const handleScrollBar = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!types) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-success" role="status"></div>
      </div>
    );
  }

  return (
    <>
      <section className="home-title mask mask-custom bg-image p-5 text-center shadow-1-strong mb-5 text-white">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/vitalfresh-53b01.appspot.com/o/vitalfresh%2Fvitalfresh-title-main-trans.png?alt=media&token=b18552cc-c9e0-4300-9414-c4998ddb87a5"
          alt="logo"
          height={150}
          width={150}
        />
      </section>

      <section className="home-about container bg-green-shadow mb-3 pb-5 rounded">
        <h1 className="text-center">About us</h1>
        <div className="row text-justify rounded bg-dark text-light p-2">
          <p>
            Welcome to VitalFresh, your one-stop online destination for all
            things healthy and delicious. At VitalFresh, we're on a mission to
            empower you to make better choices for your well-being by offering a
            wide array of nutritious and wholesome foods that not only nourish
            your body but also tantalize your taste buds.
          </p>
          <p>
            Easy and Secure Shopping: Our user-friendly website is designed with
            your convenience in mind. With just a few clicks, you can browse,
            select, and purchase your favorite healthy foods, all backed by
            robust security measures to protect your personal information.
          </p>
          <p>
            Join the VitalFresh Community: At VitalFresh, we believe that
            healthy eating should be a joyful experience, not a chore. We invite
            you to join our thriving community of health enthusiasts and food
            lovers who are committed to making nutritious choices every day.
          </p>
          <p>
            Embark on a journey towards a healthier, happier you with
            VitalFresh. Explore our website today and discover the vibrant world
            of wholesome foods that await you.
          </p>
          <p>
            VitalFresh - Where Fresh Meets Healthy, and Healthy Meets Delicious.
          </p>
        </div>
      </section>

      <section className="home-products container bg-green-shadow rounded mb-3 pb-5">
        <h1 className="text-center">Our products</h1>
        <div className={isMobile ? "row row-cols-1 g-1" : "row row-cols-3 g-3"}>
          {types.map((type) => (
            <Link
              to={"shop/" + type.id}
              key={type.id}
              className=""
              onClick={handleScrollBar}
            >
              <div className="col">
                <div className="card">
                  <img
                    src={type.file}
                    className="card-img-top"
                    alt="Hollywood Sign on The Hill"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{type.name}</h5>
                    <p className="card-text">{type.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footnote fixed_bottom={false} />
    </>
  );
};

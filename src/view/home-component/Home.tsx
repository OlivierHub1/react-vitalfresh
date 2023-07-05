import React, { useEffect, useState } from "react";
import { Footnote } from "../footnote-component/Footnote";
import { NavBar } from "../navbar-component/NavBar";
import "./Home.css";

export const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <main>
        <section className="home-title mask mask-custom bg-image p-5 text-center shadow-1-strong mb-5 text-white">
          <img
            src="/src/assets/images/logos/vitalfresh-title-main-trans.png"
            alt="logo"
            height={150}
            width={150}
          />
        </section>

        <section className="home-about container bg-green-shadow mb-3 pb-5 rounded">
          <h1 className="text-center">About us</h1>
          <div className="row text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            temporibus doloremque, illum aliquam perspiciatis ab debitis
            quaerat, sunt eligendi, eum mollitia omnis? Enim, quas minima harum
            magnam saepe, ea eligendi illum voluptatibus dolor deleniti alias
            nulla vitae. Accusantium, dolorem et alias repellendus corporis
            culpa, eveniet expedita fugit autem iure asperiores architecto
            aspernatur! Eos obcaecati, culpa velit laudantium exercitationem
            laborum? Illo rerum quisquam harum distinctio earum, veritatis
            assumenda exercitationem, quo, iusto tenetur impedit odio quam.
            Dicta hic exercitationem minima sapiente corporis, voluptate, qui
            rem obcaecati, repellat error quibusdam reprehenderit. Neque totam
            veniam praesentium in architecto ratione libero expedita, repellat
            soluta enim.
          </div>
        </section>

        <section className="home-products container bg-green-shadow rounded mb-3 pb-5">
          <h1 className="text-center">Our products</h1>
          <div className={isMobile ? 'row row-cols-1 g-1' : 'row row-cols-3 g-3'}>
          <div className="col">
            <div className="card">
              <img
                src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp"
                className="card-img-top"
                alt="Hollywood Sign on The Hill"
              />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <img
                src="https://mdbcdn.b-cdn.net/img/new/standard/city/042.webp"
                className="card-img-top"
                alt="Palm Springs Road"
              />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <img
                src="https://mdbcdn.b-cdn.net/img/new/standard/city/043.webp"
                className="card-img-top"
                alt="Los Angeles Skyscrapers"
              />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <img
                src="https://mdbcdn.b-cdn.net/img/new/standard/city/044.webp"
                className="card-img-top"
                alt="Skyscrapers"
              />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <img
                src="https://mdbcdn.b-cdn.net/img/new/standard/city/046.webp"
                className="card-img-top"
                alt="Skyscrapers"
              />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <img
                src="https://mdbcdn.b-cdn.net/img/new/standard/city/050.webp"
                className="card-img-top"
                alt="Skyscrapers"
              />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
            </div>
          </div>
        </div>
        </section>

        
      </main>

      <Footnote></Footnote>
    </>
  );
};

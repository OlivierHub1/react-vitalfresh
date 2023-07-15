import React, { useEffect, useState } from "react";
import { Footnote } from "../footnote-component/Footnote";
import "./Home.css";
import { TypeService } from '../../assets/service/typeService';
import { Link } from "react-router-dom";

export const Home = () => {
  //Get type
  const typeService = new TypeService();
  const types = typeService.getTypes();

  // Control size mobile (768) responsive
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
          temporibus doloremque, illum aliquam perspiciatis ab debitis quaerat,
          sunt eligendi, eum mollitia omnis? Enim, quas minima harum magnam
          saepe, ea eligendi illum voluptatibus dolor deleniti alias nulla
          vitae. Accusantium, dolorem et alias repellendus corporis culpa,
          eveniet expedita fugit autem iure asperiores architecto aspernatur!
          Eos obcaecati, culpa velit laudantium exercitationem laborum? Illo
          rerum quisquam harum distinctio earum, veritatis assumenda
          exercitationem, quo, iusto tenetur impedit odio quam. Dicta hic
          exercitationem minima sapiente corporis, voluptate, qui rem obcaecati,
          repellat error quibusdam reprehenderit. Neque totam veniam praesentium
          in architecto ratione libero expedita, repellat soluta enim.
        </div>
      </section>

      <section className="home-products container bg-green-shadow rounded mb-3 pb-5">
        <h1 className="text-center">Our products</h1>
        <div className={isMobile ? "row row-cols-1 g-1" : "row row-cols-3 g-3"}>
          {types.map((type) => (
            <Link to={"/shop/" + type.id} key={type.id}>
              <div className="col">
                <div className="card">
                  <img
                    src={"src/assets/images/product/type/" + type.file}
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

      <Footnote></Footnote>
    </>
  );
};

/*
// data loader
export const typesLoader = async () => {
  const res = await fetch('../../assets/data/type.json')

  if (!res.ok) {
    throw Error('Could not find the career')
  }

  return res.json()
}*/

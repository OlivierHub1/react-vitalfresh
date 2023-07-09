import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowLeft,
  faAngleDown,
  faTrashAlt,
  faLongArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import "./Cart.css";

export const Cart = () => {
  return (
    <div className="container mt-5 p-3 rounded cart">
      <div className="row no-gutters">
        <div className="col-md-8">
          <div className="product-details mr-2">
            <div className="d-flex flex-row align-items-center">
              <FontAwesomeIcon icon={faLongArrowLeft} />
              <span className="ml-2">Continue Shopping</span>
            </div>
            <hr />
            <h6 className="mb-0">Shopping cart</h6>
            <div className="d-flex justify-content-between">
              <span>You have 4 items in your cart</span>
              <div className="d-flex flex-row align-items-center">
                <span className="text-black-50">Sort by:</span>
                <div className="price ml-2">
                  <span className="mr-1">price</span>
                  <FontAwesomeIcon icon={faAngleDown} />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
              <div className="d-flex flex-row">
                <img
                  className="rounded m-3"
                  src="/src/assets/images/product/fruits/apple.png"
                  width="40"
                  alt="Product"
                />
                <div className="ml-2">
                  <span className="font-weight-bold d-block">Apple</span>
                  <span className="spec">Fruit</span>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center">
                <span className="d-block m-2">2</span>
                <span className="d-block font-weight-bold m-2">$900</span>
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className="text-black-50 m-2"
                />
              </div>
            </div>
            {/* Repeat the above structure for the remaining items */}
          </div>
        </div>
        <div className="col-md-4">
          <div className="payment-info">
            <div className="d-flex justify-content-between align-items-center">
              <span>Card details</span>
              <img
                className="rounded"
                src="https://i.imgur.com/WU501C8.jpg"
                width="30"
                alt="Card Logo"
              />
            </div>
            <span className="type d-block mt-3 mb-1">Card type</span>
            <label className="radio">
              <input type="radio" name="card" value="payment" checked />
              <span>
                <img
                  width="30"
                  src="https://img.icons8.com/color/48/000000/mastercard.png"
                  alt="Mastercard"
                />
              </span>
            </label>
            <label className="radio">
              {" "}
              <input type="radio" name="card" value="payment" />{" "}
              <span>
                <img
                  width="30"
                  src="https://img.icons8.com/officel/48/000000/visa.png"
                />
              </span>{" "}
            </label>

            <label className="radio">
              {" "}
              <input type="radio" name="card" value="payment" />{" "}
              <span>
                <img
                  width="30"
                  src="https://img.icons8.com/ultraviolet/48/000000/amex.png"
                />
              </span>{" "}
            </label>

            <label className="radio">
              {" "}
              <input type="radio" name="card" value="payment" />{" "}
              <span>
                <img
                  width="30"
                  src="https://img.icons8.com/officel/48/000000/paypal.png"
                />
              </span>{" "}
            </label>
            {/* Repeat the above structure for the remaining card types */}
            <div>
              <label className="credit-card-label">Name on card</label>
              <input
                type="text"
                className="form-control credit-inputs"
                placeholder="Name"
              />
            </div>
            <div>
              <label className="credit-card-label">Card number</label>
              <input
                type="text"
                className="form-control credit-inputs"
                placeholder="0000 0000 0000 0000"
              />
            </div>
            <div className="row">
              <div className="col-md-6">
                <label className="credit-card-label">Date</label>
                <input
                  type="text"
                  className="form-control credit-inputs"
                  placeholder="12/24"
                />
              </div>
              <div className="col-md-6">
                <label className="credit-card-label">CVV</label>
                <input
                  type="text"
                  className="form-control credit-inputs"
                  placeholder="342"
                />
              </div>
            </div>
            {/* Add the remaining credit card input fields */}
            <hr className="line" />
            <div className="d-flex justify-content-between information">
              <span>Subtotal</span>
              <span>$3000.00</span>
            </div>
            <div className="d-flex justify-content-between information">
              <span>Shipping</span>
              <span>$20.00</span>
            </div>
            <div className="d-flex justify-content-between information">
              <span>Total(Incl. taxes)</span>
              <span>$3020.00</span>
            </div>
            {/* Add the remaining information sections */}
            <button
              className="btn btn-dark btn-block d-flex justify-content-between mt-3 w-100"
              type="button"
            >
              <span>$3020.00</span>
              <span>
                Checkout
                <FontAwesomeIcon icon={faLongArrowRight} className="ml-1" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

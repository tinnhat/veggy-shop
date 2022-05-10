import { Button, Input, Space } from "antd";
import "./style.scss";
import {
  ShoppingCartOutlined,
  CloseOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
const Header = (props) => {
  const { cartItems } = props;
  const [cart, setCart] = useState([...cartItems]);
  const { Search } = Input;
  const [openCart, setOpenCart] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (openCart && ref.current && !ref.current.contains(e.target)) {
        setOpenCart(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [openCart]);
  const total = cart.reduce((acc, val, idx) => {
    return acc + val.price;
  }, 0);
  useEffect(() => {
    setCart(cartItems);
  }, [cartItems]);
  const hanldeDeleteItemCart = (pro) => {
    const idx = cart.findIndex((val) => val.id === pro.id);
    const newCartItems = [...cart];
    newCartItems.splice(idx, 1);
    sendData(newCartItems);
    setCart(newCartItems);
  };
  const sendData = (value) => {
    props.parentCallback(value);
  };
  const hanleSearch = (e) => {
    sendSearch(e.target.value);
  };
  const sendSearch = (value) => {
    props.SearchFromHeader(value);
  };
  localStorage.setItem("cart", JSON.stringify(cart));

  return (
    <header className="header">
      <div className="container">
        <div className="header-flex">
          <div className="logo">ntshop</div>
          <div className="search-box">
            <Search
              className="input-search"
              placeholder="Search by any keyword"
              allowClear
              enterButton="Search"
              size="large"
              onChange={hanleSearch}
            />
          </div>
          <div className="box-cart">
            <div className="item-box">
              {cart.length > 0 ? (
                <>
                  <p className="text-cart">Items: {cart.length}</p>
                  <p className="text-cart">
                    Sub total: <DollarOutlined /> {total}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-cart">No. of items: 0</p>
                  <p className="text-cart">Sub total: 0</p>
                </>
              )}
            </div>
            <div className="cart-icon">
              <ShoppingCartOutlined
                className="icon-cart"
                onClick={() => setOpenCart((openCart) => !openCart)}
              />
              {openCart && (
                <div className="box-cart-product" ref={ref}>
                  {cart.length ? (
                    <div className="cart-item">
                      <ul className="list-products">
                        {cart &&
                          cart.map((pro) => {
                            return (
                              <li className="product-cart-item" key={pro.id}>
                                <img
                                  src={pro.image}
                                  alt={pro.name}
                                  className="product-cart-item-img"
                                />
                                <div className="product-cart-info">
                                  <p className="product-cart-name">
                                    {pro.name}
                                  </p>
                                  <p className="product-cart-price">
                                    <DollarOutlined />
                                    {pro.price}
                                  </p>
                                </div>
                                <div className="product-cart-box-price">
                                  <p className="product-cart-quantity">
                                    No. {pro.quantity}
                                  </p>
                                  <p className="product-cart-total-price">
                                    <DollarOutlined /> {pro.price}
                                  </p>
                                </div>
                                <CloseOutlined
                                  className="icon-delete-product"
                                  onClick={() => {
                                    hanldeDeleteItemCart(pro);
                                  }}
                                />
                              </li>
                            );
                          })}
                      </ul>
                      <button className="btn-proceed active-proceed">
                        proceed to checkout
                      </button>
                    </div>
                  ) : (
                    <div className="cart-item">
                      <div className="img-car-box">
                        <img
                          src="https://res.cloudinary.com/sivadass/image/upload/v1495427934/icons/empty-cart.png"
                          alt=""
                          className="img-cart"
                        />
                        <p className="img-cart-text">You cart is empty!</p>
                      </div>
                      <button className="btn-proceed">
                        proceed to checkout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;

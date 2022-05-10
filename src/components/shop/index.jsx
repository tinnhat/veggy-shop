import Header from "../header";
import { Pagination, Row, Col, Checkbox, Button } from "antd";
import ReactPaginate from "react-paginate";
import "./style.scss";
import Product from "../product";
import { useEffect, useState } from "react";
import Footer from "../footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "../notfound";
const url =
  "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json";
const VeggyShop = () => {
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [allItems, setAllItems] = useState([]);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [pageNumber, setPageNumber] = useState(0);

  const [category, setCatogy] = useState([
    { name: "vegetables", status: false },
    { name: "fruits", status: false },
    { name: "nuts", status: false },
  ]);
  const [keyWordSearch, setKeyWordSearch] = useState("");
  const getAllProducts = async () => {
    try {
      const response = await fetch(url);
      const products = await response.json();
      setAllItems(products.map((val) => ({ ...val, quantity: 1 })));
      setData(products.map((val) => ({ ...val, quantity: 1 })));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  const hanleChangeAddProduct = (product) => {
    toast.success("Add item to cart successfully");
    const idx = cartItems.findIndex((val) => val.id === product.id);
    if (idx === -1) {
      const newCartItems = [
        ...cartItems,
        { ...product, price: product.price * product.quantity },
      ];
      setCartItems(newCartItems);
    } else {
      const newCartItems = [...cartItems];
      newCartItems[idx] = {
        ...newCartItems[idx],
        quantity: newCartItems[idx].quantity + product.quantity,
        price: product.price * (newCartItems[idx].quantity + product.quantity),
      };
      setCartItems(newCartItems);
    }
  };
  const callbackFunction = (childData) => {
    setCartItems(childData);
  };
  const onChange = (e) => {
    const idx = category.findIndex((val) => val.name === e.target.id);
    if (e.target.id === "vegetables") {
      const newCategory = [...category];
      newCategory[idx].status = e.target.checked;
      setCatogy(newCategory);
    } else if (e.target.id === "fruits") {
      const newCategory = [...category];
      newCategory[idx].status = e.target.checked;
      setCatogy(newCategory);
    } else if (e.target.id === "nuts") {
      const newCategory = [...category];
      newCategory[idx].status = e.target.checked;
      setCatogy(newCategory);
    }
  };
  const setQuantityProduct = (id, value) => {
    const idx = data.findIndex((val) => val.id === id);
    const item = data[idx];
    setData([
      ...data.slice(0, idx),
      {
        ...item,
        quantity: item.quantity + value >= 1 ? item.quantity + value : 1,
      },
      ...data.slice(idx + 1),
    ]);
  };
  const KeySearch = (childData) => {
    setKeyWordSearch(childData);
  };
  const handleSortByCategory = () => {
    const newdata = allItems.filter((val) => {
      for (let i = 0; i < category.length; i++) {
        if (val.category === category[i].name) {
          if (category[i].status === true) {
            return val;
          }
        }
      }
    });
    setData(newdata);
  };
  //pagnition
  const productsPage = 12;
  const pagesVisited = pageNumber * productsPage;
  const displayProducts = data
    .filter((val) => {
      if (keyWordSearch === "") {
        return val;
      } else if (val.name.toLowerCase().includes(keyWordSearch.toLowerCase())) {
        return val;
      }
    })
    .map((pro) => {
      return (
        //key nay cua col

        <Col
          className="gutter-row animation-product"
          xs={24}
          sm={12}
          md={8}
          lg={6}
          xl={6}
          key={pro.id}
        >
          <Product
            key={pro.id} //key nay cua product
            id={pro.id}
            name={pro.name}
            price={pro.price}
            img={pro.image}
            quantity={pro.quantity}
            hanleChangeAddProduct={() => hanleChangeAddProduct(pro)}
            setQuantityProduct={setQuantityProduct}
          />
        </Col>
      );
    })
    .slice(pagesVisited, pagesVisited + productsPage);
  const pageCount = Math.ceil(data.length / productsPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <>
      <div className="shop">
        <Header
          cartItems={cartItems}
          parentCallback={callbackFunction}
          SearchFromHeader={KeySearch}
        />
        <section className="product">
          <div className="container">
            <Row gutter={[14, 0]}>
              <Col span={4} id="menu-find">
                <div className="box-filter">
                  <p className="text-filter">Sort by Category</p>
                  <div className="box-checkbox">
                    <Checkbox
                      onChange={onChange}
                      className="Checkbox-sort "
                      id="vegetables"
                    >
                      Vegetables
                    </Checkbox>
                    <br />
                    <Checkbox
                      onChange={onChange}
                      className="Checkbox-sort "
                      id="fruits"
                    >
                      Fruits
                    </Checkbox>
                    <br />

                    <Checkbox
                      onChange={onChange}
                      className="Checkbox-sort "
                      id="nuts"
                    >
                      Nuts
                    </Checkbox>
                  </div>

                  <Button
                    type="primary"
                    style={{ marginTop: "20px", width: "100%" }}
                    onClick={handleSortByCategory}
                  >
                    Find
                  </Button>
                </div>
              </Col>
              <Col span={20}>
                <Row gutter={[24, 24]}>
                  {displayProducts.length === 0 ? (
                    <div className="not-found-section">
                      <NotFound />
                    </div>
                  ) : (
                    displayProducts
                  )}
                </Row>
              </Col>
            </Row>
            <div className="pagination-box">
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagnitionsBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
              />
            </div>
          </div>
        </section>
        <Footer />
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};
export default VeggyShop;

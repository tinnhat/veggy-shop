import {
  DollarOutlined,
  PlusOutlined,
  MinusOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { Modal, Button, Input, InputNumber } from "antd";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import "./style.scss";
const Product = (props) => {
  const { id, name, price, img, category, hanleChangeAddProduct, quantity } =
    props;
  const [quantityProduct, setQuantityProduct] = useState(1);
  const [added, setAdded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleChangeNumber = (e) => {
    if (e.target.value > 100) {
      toast.error("Quantity maximum is 100");
      return;
    } else if (isNaN(e.target.value)) {
      toast.error("Please input only number");
      return;
    } else if (e.target.value < 1) {
      toast.error("Quantity at least 1");
      return;
    }
  };
  const hanleUpQuantity = () => {
    setQuantityProduct(quantity);
    props.setQuantityProduct(props.id, 1);
  };
  const hanleDownQuantity = () => {
    if (quantity === 1) {
      toast.error("At least 1 product");
      return;
    }
    props.setQuantityProduct(props.id, -1);
  };
  const reloadBtn = () => {
    setTimeout(() => {
      setAdded(false);
    }, 5000);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="product-box">
      <div className="box-hover-img">
        <img src={img} alt={name} className="product-img" onClick={showModal} />
      </div>
      <p className="product-text">{name}</p>
      <p className="product-price">
        <DollarOutlined /> {price}
      </p>
      <div className="box-quantity">
        <Button type="success" shape="circle" onClick={hanleUpQuantity}>
          <PlusOutlined />
        </Button>
        <div className="number-quantity">
          <Input value={quantity} readOnly onChange={handleChangeNumber} />
        </div>

        <Button type="success" shape="circle" onClick={hanleDownQuantity}>
          <MinusOutlined />
        </Button>
      </div>
      <Modal visible={isModalVisible} centered onCancel={handleCancel}>
        <img src={img} alt={name} className="product-img-modal" />
        <div className="modal-footer">
          <p className="modal-product-name">{name}</p>
          <p className="modal-product-price">
            <DollarOutlined /> {price}
          </p>
        </div>
      </Modal>
      {!added ? (
        <Button
          type="primary"
          onClick={() => {
            hanleChangeAddProduct();
            setAdded(!added);
            reloadBtn();
          }}
        >
          ADD TO CART
        </Button>
      ) : (
        <Button className="btn-added">
          <CheckOutlined /> Added
        </Button>
      )}
    </div>
  );
};
export default Product;

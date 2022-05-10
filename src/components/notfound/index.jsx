import img from "./bare-tree.png";
import "./style.scss";
const NotFound = () => {
  return (
    <section className="not-found">
      <img src={img} alt="" className="not-found-img" />
      <h2 className="not-found-title">
        Sorry, no products matched your search!
      </h2>
      <p className="not-found-text">Enter a different keyword and try.</p>
    </section>
  );
};
export default NotFound;

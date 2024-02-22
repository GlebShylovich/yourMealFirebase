import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import logout from "../../assets/img/logout.png";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Basket from "../../Components/Basket/Basket";
import Card from "../../Components/Card/Card";
import Tab from "../../Components/Tab/Tab";
import Modal from "../../Components/Modal/Modal";
import tabsData from "../../tabs.json";
import "./page.scss";
import { tabArrImg } from "../../picture";
export default function Page({
  pageTitle,
  pageData,
  pageImages,
  addBasket,
  plusBasket,
  minusBasket,
  basket,
}) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [objModal, setObjModal] = useState({});
  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };
  const [arr, setArr] = useState(tabsData);
  const [products, setProducts] = useState(pageData);
  console.log(products);
  useEffect(() => {
    addImgToTabs();
  }, []);
  function addImgToTabs() {
    const copyArr = [...arr];
    const newArr = copyArr.map((item, index) => {
      const object = {
        ...item,
        image: tabArrImg[index],
      };
      return object;
    });
    setArr(newArr);
  }
  useEffect(() => {
    addImgToProducts();
  }, [pageData]);

  function addImgToProducts() {
    const copyData = [...pageData];
    const updatedProducts = copyData.map((item, index) => ({
      ...item,
      image: pageImages[index],
    }));
    setProducts(updatedProducts);
  }

  const auth = getAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.currentUser) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [auth.currentUser]);
  return (
    <div className="wrapper">
      <Header />
      <main className="page">
        <div className="page__container">
          <div className="page__categories">
            {arr.map((item, index) => (
              <Tab item={item} key={index} />
            ))}
          </div>
          <div className="page__content">
            <Basket
              basket={basket}
              plusBasket={plusBasket}
              minusBasket={minusBasket}
            />
            <div className="products">
              <h1 className="pageTitle">{pageTitle}</h1>
              <div className="card__container">
              {products.map((item, index) => (
                <Card openModal={openModal} setObjModal={setObjModal} addBasket={addBasket} key={index} item={item} />
              ))}
              </div>
            </div>
          </div>
        </div>
        {isOpenModal && <Modal addBasket={addBasket} closeModal={closeModal}  content={objModal}/>}
      </main>
      <Footer />
      <button
        className="logoutBtn"
        onClick={() => {
          signOut(auth);
          navigate("/login");
        }}
      >
        <img src={logout} alt="Sign out" />
      </button>
    </div>
  );
}

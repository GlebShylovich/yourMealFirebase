import React, { useEffect, useState } from "react";
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
import { tabArrImg } from "../../picture";
import "./page.scss";
import right from '../../assets/img/angle-small-right.png'
import doubleRight from '../../assets/img/angle-double-small-right.png'
import left from '../../assets/img/angle-small-left.png'
import doubleLeft from '../../assets/img/angle-double-small-left.png'

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
  const [arr, setArr] = useState(tabsData);
  const [products, setProducts] = useState(pageData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    addImgToTabs();
  }, []);

  useEffect(() => {
    addImgToProducts();
  }, [pageData]);

  useEffect(() => {
    if (auth.currentUser) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [auth.currentUser]);

  function addImgToTabs() {
    const newArr = arr.map((item, index) => ({
      ...item,
      image: tabArrImg[index],
    }));
    setArr(newArr);
  }

  function addImgToProducts() {
    const updatedProducts = pageData.map((item, index) => ({
      ...item,
      image: pageImages[index],
    }));
    setProducts(updatedProducts);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

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
                {currentItems.map((item, index) => (
                  <Card
                    openModal={openModal}
                    setObjModal={setObjModal}
                    addBasket={addBasket}
                    key={index}
                    item={item}
                  />
                ))}
              </div>
              <nav>
                <div className="pagination">
                  <li
                    onClick={goToFirstPage}
                    disabled={currentPage === 1}
                    className="page-item"
                  >
                    <img src={doubleLeft} alt="" />
                  </li>
                  <li
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className="page-item"
                  >
                    <img src={left} alt="" />
                  </li>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li onClick={() => paginate(index + 1)}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`} key={index}>
                        {index + 1}
                    </li>
                  ))}
                  <div
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="page-item"
                  >
                    <img src={right} alt="" />
                  </div>
                  <div
                    onClick={goToLastPage}
                    disabled={currentPage === totalPages}
                    className="page-item"
                  >
                    <img src={doubleRight} alt="" />
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
        {isOpenModal && (
          <Modal
            addBasket={addBasket}
            closeModal={closeModal}
            content={objModal}
          />
        )}
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

import "bootstrap/dist/css/bootstrap.min.css";
import NavbarHome from "../components/NavbarHome";
import ImageSlider from "../components/ImageSlider";
import HomeBody from "../components/HomeBody";
import HomeBody1 from "../components/HomeBody1";
import Footer from "../components/FooterHome";

function Home() {
  return (
    <>
      <NavbarHome />
      <div>
        <ImageSlider />
      </div>
      <div>
        <HomeBody />
      </div>
      <div>
        <HomeBody1 />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Home;

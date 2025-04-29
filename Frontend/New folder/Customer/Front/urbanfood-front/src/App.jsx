import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarHome from './components/NavbarHome';
import ImageSlider from './components/ImageSlider'; // ✅ Import ImageSlider

function App() {
  return (
    <>
      <NavbarHome />
      <div>
        <ImageSlider />
        {/* Other homepage content here */}
      </div>
    </>
  );
}

export default App;

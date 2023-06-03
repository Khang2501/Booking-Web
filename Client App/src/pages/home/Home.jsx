import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";
import axios from 'axios'
import { useEffect , useState } from "react";
const Home = () => {

  const [hotel, setHotel] = useState({area:{}, type:{}, rating:[]})
  useEffect(()=>{
    axios.get('/hotel')
    .then(result=>setHotel(result.data))
    .catch(err=>console.log(err))
  },[])
  return (
    <div>
      <Navbar />
      <Header/>
      <div className="homeContainer">
        <Featured area={hotel.area}/>
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList type={hotel.type}/>
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties rating={hotel.rating}/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;

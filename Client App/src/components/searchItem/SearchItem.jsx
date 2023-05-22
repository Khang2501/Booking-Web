import "./searchItem.css";
import { useNavigate } from "react-router-dom";
const SearchItem = ({state}) => {
const navigate = useNavigate()
const data =   {
  name:state.name,
  distance:state.distance,
  tag:'Free tea and coffee',
  type:state.type,
  description:state.desc,
  free_cancel:true,
  price:state.cheapestPrice,
  rate:state.rating,
  rate_text:state.rating>4.5?'Exceptional':'Excellent',
  img_url:state.photos[2]?state.photos[1]:process.env.PUBLIC_URL + 'images/type_1.webp',
}

const {name, distance, tag, type,description, free_cancel, price, rate, rate_text, img_url} = data

const availabilityHandler =(params)=>{
  navigate(`/hotels/${params}`)
}

  return (
    <div className="searchItem">
      <img
        src={img_url}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{name}</h1>
        <span className="siDistance">{distance} from center</span>
        <span className="siTaxiOp">{tag}</span>
        <span className="siSubtitle">
          {description}
        </span>
        <span className="siFeatures">
          {type}
        </span>
        {/* If can cancel */}
        {free_cancel ? (
          <div>
            <span className="siCancelOp">Free cancellation </span><br/>
            <span className="siCancelOpSubtitle">
              You can cancel later, so lock in this great price today!
            </span>
          </div>
        ) : (<div></div>)}
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>{rate_text}</span>
          <button>{rate}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">${price}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button onClick={()=>availabilityHandler(state._id)} className="siCheckButton">See availability</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;

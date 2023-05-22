import "./featuredProperties.css";

const FeaturedProperties = ({rating}) => {
  return (
    <div className="fp">
      {rating.map(rat=>{
       return <div className="fpItem" key={rat.name}>
     
        <img
          src={rat.photos[2]?rat.photos[2]:process.env.PUBLIC_URL + '/images/hotel_1.webp'}
          alt=""
          className="fpImg"
        />
        <span className="fpName"><a href="./hotels/0" target="_blank">{rat.name}</a></span>
        <span className="fpCity">{rat.city}</span>
        <span className="fpPrice">Starting from ${rat.cheapestPrice}</span>
        <div className="fpRating">
          <button>{rat.rating}</button>
          <span>Excellent</span>
        </div>
      </div>
      })}
      
    </div>
  );
};

export default FeaturedProperties;

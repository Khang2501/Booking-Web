import "./featured.css";

const Featured = (props) => {
  return (
    <div className="featured">
      <div className="featuredItem">
        <img
          src={process.env.PUBLIC_URL + 'city-image/Ha Noi.jpg'}
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Ha Noi</h1>
          <h2>{props.area.HaNoi} properties</h2>
        </div>
      </div>
      
      <div className="featuredItem">
        <img
          src={process.env.PUBLIC_URL + 'city-image/HCM.jpg'}
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Ho Chi Minh</h1>
          <h2>{props.area.HoChiMinh} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src={process.env.PUBLIC_URL + 'city-image/Da Nang.jpg'}

          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Da Nang</h1>
          <h2>{props.area.DaNang} properties</h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;

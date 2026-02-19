import { useNavigate } from "react-router-dom";
import notFoundImage from "../../assets/images/notfound.png"
const NotFoundPage = () => {
  const navigitor=useNavigate()
    return (
      <div className="notFoundPageWrapper">
        <div className="image">
          <img src={notFoundImage} alt="#" />
        </div>
        <div className="data">
          <div className="text">
            <h2 className="status">۴۰۴</h2>
            <p className="subText">صفحه موردنظر یافت نشد!</p>
          </div>
          <div className="btnWrapper">
            <button onClick={()=>navigitor(-1)} className="btn">بازگشت</button>
          </div>
        </div>
      </div>
    );
}
 
export default NotFoundPage;
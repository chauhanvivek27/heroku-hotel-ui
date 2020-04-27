import React from "react";
import PropTypes from "prop-types";
import { setUrlParams } from "./../../common/util.js";
const BLOCKNAME = "hotel-search";

export default class SearchResult extends React.Component {
  static propTypes = {
    hotelList: PropTypes.arrayOf(PropTypes.object),
  };

  render() {
    const { hotelList } = this.props;
    return (
      <div className={`${BLOCKNAME}__result-section`}>
        <div className="cards">
          {hotelList &&
            hotelList.map((item, index) => {
              return (
                <div className="card" key={index}>
                  <p>{item.name}</p>
                  <h2 className="city">{item.city}</h2>
                  <p>${item.price}</p>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

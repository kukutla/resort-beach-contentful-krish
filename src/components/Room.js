import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import defaultIMG from '../images/room-1.jpeg'

export default function Room({ room, room: { name, slug, images, price } }) {
  //console.log(name, slug, images, price);

  return (
    <article className="room">
      <div className="img-container">
        <img src={images[0] || defaultIMG} alt="single room" />
        <div className="price-top">
          <h6>${price}</h6>
          <p>per night</p>
        </div>
        <Link to={`/rooms/${slug}`} className="btn-primary room-link">
          Features
        </Link>
        <p className="room-info">{name}</p>
      </div>
    </article>
  );
}

Room.propTypes = {
  room:PropTypes.shape({
    name:PropTypes.string.isRequired,
    slug:PropTypes.string.isRequired,
    images:PropTypes.arrayOf.isRequired,
    price:PropTypes.number.isRequired
  })
};

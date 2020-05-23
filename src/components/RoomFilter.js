import React from "react";
import { useContext } from "react";
import { RoomContext } from "../context";
import Title from "./Title";
const getUnique = (items, value) => {
  return [...new Set(items.map((item) => item[value]))];
};
export default function RoomFilter({ rooms }) {
  const context = useContext(RoomContext);
  //console.log(context);
  const {
    type,
    capacity,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    breakfast,
    pets,
    handleChange,
  } = context;
  let types = ["all", ...getUnique(rooms, "type")];
  types = types.map((type, index) => (
    <option value={type} key={index}>
      {type}
    </option>
  ));

  let people = getUnique(rooms, "capacity");
  people = people.map((person, index) => (
    <option value={person} key={index}>
      {person}
    </option>
  ));

  return (
    <section className="filter-container">
      <Title title="search rooms" />
      <form action="" className="filter-form">
        {/* select type */}
        <div className="form-group">
          <label htmlFor="type">room type</label>
          <select
            name="type"
            id="type"
            value={type}
            className="form-control"
            onChange={handleChange}
          >
            {types}
          </select>
        </div>
        {/* end of select type */}
        {/* room capacity */}
        <div className="form-group">
          <label htmlFor="capacity">Guests</label>
          <select
            name="capacity"
            id="capacity"
            value={capacity}
            className="form-control"
            onChange={handleChange}
          >
            {people}
          </select>
        </div>
        {/* end of room capacity */}
        {/* room price */}
        <div className="form-group">
          <label htmlFor="price"> room price ${price}
          </label>
         <input
            type="range"
            name="price"
            min={minPrice}
            max={maxPrice}
            value={price}
            id="price"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        {/* end of room price */}
        {/* room size */}
        <div className="form-group">
          <label htmlFor="size"> room size
          </label>
          <div className="size-inputs">
         <input
            type="number"
            name="minSize"
            value={minSize}
            id="minSize"
            onChange={handleChange}
            className="size-input"
          />
          <input
            type="number"
            name="maxSize"
            value={maxSize}
            id="maxSize"
            onChange={handleChange}
            className="size-input"
          />
          </div>
        </div>
        {/* end of room size */}
        {/* room extras */}
        <div className="form-group">
          <div className="single-extra">
          <input
            type="checkbox"
            name="breakfast"
            value={breakfast}
            id="breakfast"
            onChange={handleChange}
          />
          <label htmlFor="breakfast"> breakfast
          </label>
          </div>
          <div className="single-extra">
          <input
            type="checkbox"
            name="pets"
            value={pets}
            id="pets"
            onChange={handleChange}
          />
          <label htmlFor="pets"> pets
          </label>
          </div>
        </div>
        {/* end of room extras */}
      </form>
    </section>
  );
}

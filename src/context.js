import React, { Component } from "react";
//import items from "./data";
import client from './Contentful'
const RoomContext = React.createContext();

export default class RoomProvider extends Component {
  state = {
    rooms: [],
    featuredRooms: [],
    sortedRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  };

  //getData
  getData = async()=> {
    try {
      let response = await client.getEntries({
        content_type: 'beachResortRoom',
        order: 'sys.createdAt'
        //order: '-fields.price'
        //order: 'fields.price'
      })

      console.log("before filetring" ,response.items);
    let rooms = this.formatData(response.items);
    console.log(rooms);
    let featuredRooms = rooms.filter((room) => room.featured === true);
    // console.log(featuredRooms);
    let maxPrice = Math.max(...rooms.map((item) => item.price));
    let maxSize = Math.max(...rooms.map((item) => item.size));
    this.setState({
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false,
      price: maxPrice,
      maxPrice,
      maxSize,
    });
    } catch (error) {
      console.log(error);
      
    }   
  }

  componentDidMount() {
    this.getData();
    /* let rooms = this.formatData(items);
    //console.log(rooms);
    let featuredRooms = rooms.filter((room) => room.featured === true);
    // console.log(featuredRooms);
    let maxPrice = Math.max(...rooms.map((item) => item.price));
    let maxSize = Math.max(...rooms.map((item) => item.size));
    this.setState({
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false,
      price: maxPrice,
      maxPrice,
      maxSize,
    }); */
  }

  handleChange = (event) => {
    const target = event.target;
    const name = event.target.name;
    //console.log("name ", name);

    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState(
      {
        [name]: value,
      },
      this.filterRooms
    );
  };

  filterRooms = () => {
    //console.log("hello");
    let {
      rooms,
      sortedRooms,
      type,
      capacity,
      price,
      minPrice,
      maxPrice,
      minSize,
      maxSize,
      breakfast,
      pets,
    } = this.state;
    // console.log(this.state);
    let tempRooms = [...rooms];
    //console.log(type);
    capacity = parseInt(capacity);
    price = parseInt(price);

    //filter by type
    if (type !== "all") {
      tempRooms = tempRooms.filter((room) => room.type === type);
    }

    //filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
    }

    //filter by price
    if (price !== 1) {
      tempRooms = tempRooms.filter((room) => room.price <= price);
    }

    //filetr by size

    tempRooms = tempRooms.filter(
      (room) => room.size >= minSize && room.size <= maxSize
    );

    //filetr by breakfast

    if(breakfast)
    tempRooms = tempRooms.filter(
      (room) => room.breakfast === true 
    );

    //filetr by pets

    if(pets)
    tempRooms = tempRooms.filter(
      (room) => room.pets === true 
    );


    tempRooms = tempRooms.filter(
      (room) => room.size >= minSize && room.size <= maxSize
    );

    //console.log("tempRooms =>", tempRooms);
    this.setState({
      sortedRooms: tempRooms,
    });
  };

  formatData(items) {
    const tempItems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => image.fields.file.url);
      return { ...item.fields, images, id };
    });
    return tempItems;
  }

  getRoom = (slug) => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find((room) => room.slug === slug);
    return room;
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange,
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {(value) => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

export { RoomContext, RoomProvider, RoomConsumer };

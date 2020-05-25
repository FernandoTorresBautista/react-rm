import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import $ from 'jquery';

const imgStl = {
  width: "100%",
  maxHeigth: "140px!important",
  float: "left"
};

const imgContent = {
  width: "75%",
  alignText: "center"
}

class DemoCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagenes: this.props.imgs
    }
  }

  state = {
    activeSlideIndex: 0,
  }

  setActiveSlideIndex = (newActiveSlideIndex) => {
    this.setState({
      activeSlideIndex: newActiveSlideIndex
    });
    this.hideInnecesaryElemets();
  }

  hideInnecesaryElemets(){
      $(".control-dots").css("display", "none"); 
      $(".legend").css("display", "none"); 
      $(".thumbs-wrapper").css("display", "none");
  }

  componentDidUpdate(props) {
    this.hideInnecesaryElemets();
  }

  render() {
    return (
      <Carousel onChange={this.hideInnecesaryElemets()}>
        {this.state.imagenes.map((item,index) =>
          <div className="Img-caoursel-content" key={index} style={imgContent}>
            <img id={index} src={item.replace("character/", "character/avatar/") + ".jpeg"} style={imgStl} alt="carousel_characters"></img>
            <p className="legend"></p>
          </div>
        )}
      </Carousel>
    );
  }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(DemoCarousel);

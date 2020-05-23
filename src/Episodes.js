import React from 'react';
import { connect } from 'react-redux';
import { getEpisodes } from './reducer';

import DemoCarousel from './DemoCarousel';

/*
const component = props => (
  <div className="row">
    <br />
    {props.items.map(item =>
      <div className="col-xs-12 col-md-4 col-lg-4 Episode-card" id={item.id} key={item.id}>
        <span>Name: {item.name}</span> <br />
        <small>Release Date {item.air_date}</small> <br />
        <small>Acronym: {item.episode}</small> <br />
      </div>
    )}
  </div >
);
*/

class component extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPageEpi: 1,
      todosPerPageEpi: 6,
      todosEpi: [],
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({
      currentPageEpi: Number(e.target.id),
    })
  }

  render() {
    const { currentPageEpi, todosPerPageEpi } = this.state;
    console.log("todos episodes");

    const indexOfLastTodo = currentPageEpi * todosPerPageEpi;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPageEpi;
    const currentTodos = this.props.items.slice(indexOfFirstTodo, indexOfLastTodo);

    const styleNoFlex = {
      display: 'inline-block',
      margin: 0,
    }

    const renderTodos = currentTodos.map((todo, index) => {
      //return <li key={index}>{todo.name}</li>;
      return (
        <div className="col-xs-12 col-md-4 col-lg-4" style={styleNoFlex} id={todo.id} key={todo.id}>
          <div className="col-xs-12 col-sm-12 col-lg-12" style={styleNoFlex}>
            <h5>{todo.name}</h5>
            <div>
              <small>Release Date {todo.air_date}</small> <br />
              <small>Acronym of episode: {todo.episode}</small> <br />
            </div>
            <div>
              <DemoCarousel imgs={todo.characters}/>
            </div>
          </div>
        </div>
      );
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.props.items.length / todosPerPageEpi); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <div
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </div>
      );
    });

    const styleEpisodesContect = {
      display: "block",
    }
    const blockSmallButton = {
      display: "inline-flex",
      position: "relative",
      margin: "0 10px 0 5px ",
      maxWidth: "4%"
    }

    return (
      <div className="EpisodesContainerDiv">
        <h4>Episodes</h4>
        <div className="row" id="items-content" style={styleEpisodesContect}>
          {renderTodos}
        </div>
        <div className="row" id="page-numbers" style={styleEpisodesContect}>
          {renderPageNumbers.map(number => {
            return (
              <div className="button button-primary" style={blockSmallButton}
                key={number}
                id={number}
                onClick={this.handleClick}
              >
                {number}
              </div>
            );
          })
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: getEpisodes(state),
});
export default connect(mapStateToProps)(component);
/**
{item.characters.map(character => <img key={Math.random()} src={character.replace("character/", "character/avatar/") + ".jpeg"} style={imgStl}></img>)}
 */

import React from 'react';
import { connect } from 'react-redux';
import { getCharacters } from './reducer';
/*
const comp = props => (
  <ul>
    {props.items.map(item => <li key={item}>{item}</li>)}
  </ul>
);
{props.items.map(item => <div>{item.id}</div>)}

function objectsToCharacter(){
  this.props.items = JSON.parse(this.props.items);
}
*/

const imgStl = {
  width: "120px",
  heigth: "120px",
  float: "left"
};
/*
const comp = props => (
  <div className="row">
    <br/>
    {props.items.map(item =>
      <div className="col-xs-12 col-md-4 col-lg-4 Character-card" id={item.id} key={item.id}>
        <img src={item.image} alt="avatar" style={imgStl}></img>
        <span> {item.name}</span>, <span> Status: {item.status}</span> <br/>
        <small> Specie: {item.species}</small>, <small>Gender: {item.gender}</small> <br/>
        <small> 
          Number of chapther where appears: { item.episode.length }
        </small>        
      </div>
    )}
  </div >
);
*/

class component extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      todosPerPage: 6,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({
      currentPage: Number(e.target.id),
    })
  }

  render() {
    const { currentPage, todosPerPage } = this.state;
    console.log("todos character");

    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = this.props.items.slice(indexOfFirstTodo, indexOfLastTodo);

    const styleNoFlex = {
      display: 'inline-flex',
      margin: 0,
    }

    const renderTodos = currentTodos.map((todo, index) => {
      //return <li key={index}>{todo.name}</li>;
      return (
        <div className="col-xs-12 col-md-4 col-lg-4" style={styleNoFlex} id={todo.id} key={todo.id}>
          <div className="col-xs-12 col-md-12 col-lg-12">
            <h5>{todo.name}</h5>
            <div>
              <img src={todo.image} alt="avatar" style={imgStl}></img>
            </div>
            <div>
              <span> Status: <l>{todo.status}</l></span> <br />
              <small> Specie: {todo.species}</small>, <small>Gender: {todo.gender}</small> <br />
              <small>
                Number of chapther where appears: {todo.episode.length}
              </small>
            </div>
          </div>
        </div>
      );
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.props.items.length / todosPerPage); i++) {
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

    const styleChacatersContect = {
      display: "block",
    }
    const blockSmallButton = {
      display: "inline-flex",
      position: "relative",
      margin: "0 10px 0 5px ",
      maxWidth: "4%"
    }

    return (
      <div className="CharactersContainerDiv">
        <h4>Personajes</h4>
        <div className="row" id="items-content" style={styleChacatersContect}>
          {renderTodos}
        </div>
        <div className="row" id="page-numbers" style={styleChacatersContect}>
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
  items: getCharacters(state),
});

export default connect(mapStateToProps)(component);
/**
        <small> Number of chapther where appears: {item.episode.length}
          {item.episode.map(episode => <i key={episode.replace("https://rickandmortyapi.com/api/episode/", "")}>{episode.replace("https://rickandmortyapi.com/api/episode/", "")}, </i>)}
        </small>

 */

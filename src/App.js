import logo from "./logo.svg";
import React from "react";
import "./App.css";
import "./ListItems";
import ListItems from "./ListItems";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: {
        text: "",
        key: "",
      },
      quote: "",
      author: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount() {
    this.quotesList();
  }

  quotesList() {
    //fetch repos
    fetch(`https://favqs.com/api/qotd`)
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          this.setState({
            quote: data["quote"]["body"],
            author: data["quote"]["author"],
          });
        }, 2000);
      });
  }

  handleInputChange(e) {
    this.setState({
      currentItem: {
        text: e.target.value,
        key: Date.now(),
      },
    });
  }

  addItem(e) {
    e.preventDefault();
    const newItem = this.state.currentItem;
    if (newItem.text !== "") {
      const items = [...this.state.items, newItem];
      this.setState({
        items: items,
        currentItem: {
          text: "",
          key: "",
        },
      });
    }
  }

  setUpdate(text, key) {
    const items = this.state.items;
    items.map((item) => {
      if (item.key == key) {
        item.text = text;
      }
    });
    this.setState({
      items: items,
    });
  }

  deleteItem(e) {
    const deletedItem = this.state.items.filter((item) => item.key !== e);
    this.setState({
      items: deletedItem,
    });
  }

  get toDisplayQuotes() {
    if (this.state.quote && this.state.author) {
      return (
        <span className="quote-body">
          {this.state.quote} - {this.state.author}
        </span>
      );
    } else {
      return (
        <span className="quote-body">
          loading ...
        </span>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <div className="quote-area">
          <p>
            {this.toDisplayQuotes}
          </p>
        </div>
        <div className="todo">
          <h3>
            <span className="header">My TODO :-)</span>
          </h3>
          <div className="form-group">
            <form id="todoForm" onSubmit={this.addItem}>
              <input
                className="form-control"
                type="text"
                placeholder="What's in your mind?"
                value={this.state.currentItem.text}
                onChange={this.handleInputChange}
              ></input>
              <button type="submit">Add</button>
            </form>
            <ListItems
              items={this.state.items}
              deleteItem={this.deleteItem}
              setUpdate={this.setUpdate}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

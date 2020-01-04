import React, { Component } from "react";

class MemeGen extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      buttomText: "",
      randomImg: "https://i.imgflip.com/1bij.jpg",
      allImg: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.whenSubmit = this.whenSubmit.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        const { memes } = response.data;
        // console.log(memes[0])
        this.setState({ allImg: memes });
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  whenSubmit(event) {
    event.preventDefault();
    const randomNum = Math.floor(Math.random() * this.state.allImg.length);

    const generatedMemeImg = this.state.allImg[randomNum].url;

    this.setState({ randomImg: generatedMemeImg });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.whenSubmit}>
          <input
            type="text"
            placeholder="Top Text"
            value={this.state.topText}
            name="topText"
            onChange={this.handleChange}
          />

          <input
            type="text"
            placeholder="Buttom Text"
            value={this.state.buttomText}
            name="buttomText"
            onChange={this.handleChange}
          />

          <button> Generate </button>
        </form>

        <div>
          <img src={this.state.randomImg} alt="" />
          <h2>{this.state.topText}</h2>
          <h2>{this.state.buttomText}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGen;

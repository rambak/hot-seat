import React from 'react';

class Strikethrough extends React.Component {
  constructor() {
    super();
    this.state = {
      strike: '',
      remaining: '',
    };

    this.strikethrough = this.strikethrough.bind(this);
  }

  async componentDidMount() {
    await this.setState({ remaining: this.props.str });

    setTimeout(() => {
      this.strikethrough();
    }, 1000);
  }

  strikethrough() {
    if (this.state.remaining !== '') {
      setTimeout(async () => {
        await this.setState({
          strike: this.state.strike + this.state.remaining.slice(0, 1),
          remaining: this.state.remaining.slice(1),
        });
        if (this.state.remaining !== '') {
          this.strikethrough();
        } else {
          await this.setState({ complete: true });
        }
      }, 50);
    }
  }

  render() {
    return (
      <div>
        <span className="strikethrough">{this.state.strike}</span>
        {this.state.remaining}
      </div>
    );
  }
}

export default Strikethrough;

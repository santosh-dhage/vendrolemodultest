import React from "react";

class SessionTimeout extends React.Component {
  timeout;

  componentDidMount() {
    this.startCountdown();
    this.setupEventListeners();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    this.removeEventListeners();
  }

  setupEventListeners = () => {
    document.addEventListener("mousemove", this.handleActivity);
    document.addEventListener("keydown", this.handleActivity);
    document.addEventListener("scroll", this.handleActivity);
  };

  removeEventListeners = () => {
    document.removeEventListener("mousemove", this.handleActivity);
    document.removeEventListener("keydown", this.handleActivity);
    document.removeEventListener("scroll", this.handleActivity);
  };

  resetTimeout = () => {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.props.onTimeout, this.props.timeoutInSeconds * 1000);
  };

  handleActivity = () => {
    this.resetTimeout();
  };

  startCountdown = () => {
    this.resetTimeout();
  };

  render() {
    return null;
  }
}

export default SessionTimeout;

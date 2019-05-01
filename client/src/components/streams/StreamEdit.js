import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";
import _ from "lodash";

class StreamEdit extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editStream(this.props.stream.id, formValues);
  };

  render() {
    console.log(this.props.stream);
    if (this.props.stream) {
      return (
        <div>
          <h3>Edit a Stream</h3>
          <StreamForm
            onSubmit={this.onSubmit}
            initialValues={_.pick(this.props.stream, "title", "description")}
          />
        </div>
      );
    } else {
      return (
        <div>
          <h3>Edit a Stream</h3>
          <StreamForm onSubmit={this.onSubmit} />
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(
  mapStateToProps,
  { fetchStream, editStream }
)(StreamEdit);

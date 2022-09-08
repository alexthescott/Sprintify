import React, { Component } from 'react';
import { connect } from 'react-redux';

import { saveLogin } from '../../concepts/auth';

class Callback extends Component {
    componentDidMount() {
        this.props.saveLogin();
    }

    render() {
        return <div className="flex justify-center items-center h-screen bg-black text-white">Login OK</div>;
    }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = { saveLogin };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Callback);
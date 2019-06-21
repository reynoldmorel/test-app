import React, { Component } from 'react';
import './loading.css';

interface LoadingProps {
    show: boolean;
}

export class Loading extends Component<LoadingProps> {
    constructor(public props: Readonly<LoadingProps>) {
        super(props);
    }

    render() {
        return (this.props.show ?
            (<div className="loading-container">
                <div className="spinner-border loading-spinner" />
                <span className="loading-spinner-text">Loading...</span>
            </div>) :
            <span />
        );
    }
}
import React, { Component, ChangeEvent } from 'react';

interface SearchProps {
    onSearch: (searchText: string) => void;
    delay: number;
    placeholderText?: string;
}

interface SearchState {
    searchText: string;
}

export class Search extends Component<SearchProps, SearchState> {

    private timeout: any;

    constructor(public props: Readonly<SearchProps>) {
        super(props);

        this.state = {
            searchText: ""
        }

        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            searchText: event.target.value
        });

        if (this.timeout)
            clearTimeout(this.timeout)
        this.timeout = null;

        this.timeout = setTimeout((searchText) => this.props.onSearch(searchText), this.props.delay, event.target.value);
    };

    render() {
        return (
            <div>
                <span>{this.props.placeholderText}</span>
                <input className="form-control"
                    type="text"
                    value={this.state.searchText}
                    onChange={this.onInputChange}
                    title={this.props.placeholderText} />
            </div>
        );
    }
}
import React, { Component, ChangeEvent } from 'react';
import './filter-selector.css';

export interface SelectOption {
    key: string;
    value: string;
}

interface FilterSelectorProps {
    onSelect: (selectedOption: SelectOption) => void;
    source: SelectOption[];
    selectedOption: SelectOption;
    text?: string;
}

export class FilterSelector extends Component<FilterSelectorProps> {

    constructor(public props: Readonly<FilterSelectorProps>) {
        super(props);

        this.onSelectChange = this.onSelectChange.bind(this);
    }

    onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        if (!this.onSelectChange) return;

        const selectedOption = this.props.source.find(so => so.key === event.target.value) as SelectOption;

        this.props.onSelect(selectedOption);
    };

    render() {
        return (
            <div className="filter-selector">
                <span>{this.props.text}</span>
                <select className="form-control"
                    value={this.props.selectedOption.key}
                    onChange={this.onSelectChange}
                    style={{
                        width: "180px"
                    }}>
                    {this.props.source.map(so => <option key={so.key} value={so.key}>{so.value}</option>)}
                </select>
            </div>
        );
    }
}
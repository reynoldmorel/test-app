import React, { Component } from 'react';
import { Search } from '../search/search.component';
import { SelectOption, FilterSelector } from '../filter-selector/filter-selector.component';
import './filter-section.css';

interface FilterSectionProps {
    onQuerySearch: (searchText: string) => void;
    querySearchDelay: number;
    queryPlaceHolderText?: string;
    onRatingSelect: (selectedOption: SelectOption) => void;
    ratingText?: string;
    ratingSource: SelectOption[];
    ratingSelectedOption: SelectOption;
}

export class FilterSection extends Component<FilterSectionProps> {

    constructor(public props: Readonly<FilterSectionProps>) {
        super(props);
    }

    render() {
        return (
            <div className="filter-section">
                <Search delay={this.props.querySearchDelay}
                    onSearch={this.props.onQuerySearch}
                    placeholderText={this.props.queryPlaceHolderText} />

                <FilterSelector onSelect={this.props.onRatingSelect}
                    selectedOption={this.props.ratingSelectedOption}
                    source={this.props.ratingSource}
                    text={this.props.ratingText} />
            </div>
        );
    }
}
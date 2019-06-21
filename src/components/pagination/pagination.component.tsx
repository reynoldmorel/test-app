import React, { Component, MouseEvent } from 'react';
import './pagination.css';

interface BuildPageNumbersResult {
    fromPage: number;
    toPage: number;
    pageNumberElements: React.ReactNode[];
}

interface PaginationProps {
    onGoToNextPage?: (page: number) => void;
    onGoToPreviousPage?: (page: number) => void;
    onGoToPageSelected?: (page: number) => void;
    onGoToFirstPage?: (page: number) => void;
    onGoToLastPage?: (page: number) => void;
    pageSize?: number;
    totalElements?: number;
    currentPage?: number;
}

export class Pagination extends Component<PaginationProps> {

    constructor(public props: Readonly<PaginationProps>) {
        super(props);

        this.onGoToLastPage = this.onGoToLastPage.bind(this);
        this.onGoToFirstPage = this.onGoToFirstPage.bind(this);
        this.onGoToNextPage = this.onGoToNextPage.bind(this);
        this.onGoToPreviousPage = this.onGoToPreviousPage.bind(this);
        this.onGoToPageSelected = this.onGoToPageSelected.bind(this);
        this.buildPageNumberElements = this.buildPageNumberElements.bind(this);
    }

    onGoToNextPage(event: MouseEvent<HTMLButtonElement>) {
        if (this.props.currentPage === undefined ||
            this.props.totalElements === undefined ||
            this.props.pageSize === undefined ||
            !this.props.onGoToNextPage) return;

        const limit = Math.ceil(this.props.totalElements / this.props.pageSize);

        if (this.props.currentPage + 1 > limit)
            return;

        this.props.onGoToNextPage(this.props.currentPage + 1);
    }

    onGoToPreviousPage(event: MouseEvent<HTMLButtonElement>) {
        if (this.props.currentPage === undefined || !this.props.onGoToPreviousPage) return;

        if (this.props.currentPage - 1 < 1)
            return;

        this.props.onGoToPreviousPage(this.props.currentPage - 1);
    }

    onGoToPageSelected(event: MouseEvent<HTMLButtonElement>, currentPage: number) {
        if (!this.props.onGoToPageSelected) return;

        this.props.onGoToPageSelected(currentPage);
    }

    onGoToFirstPage(event: MouseEvent<HTMLButtonElement>) {
        if (!this.props.onGoToFirstPage) return;

        this.props.onGoToFirstPage(1);
    }

    onGoToLastPage(event: MouseEvent<HTMLButtonElement>) {
        if (this.props.totalElements === undefined || this.props.pageSize === undefined || !this.props.onGoToLastPage) return;

        const limit = Math.ceil(this.props.totalElements / this.props.pageSize);

        this.props.onGoToLastPage(limit);
    }

    private buildPageNumberElements(): BuildPageNumbersResult {
        if (this.props.currentPage === undefined ||
            this.props.totalElements === undefined ||
            this.props.pageSize === undefined)
            return {
                fromPage: 0,
                toPage: 0,
                pageNumberElements: [(<div key={0} />)]
            };

        const pageNumberElements = [];

        let pageMultiplier = 0;
        let currentPageTemp = this.props.currentPage;

        while (currentPageTemp > this.props.pageSize) {
            pageMultiplier++;
            currentPageTemp -= this.props.pageSize;
        }

        const fromPage = pageMultiplier * this.props.pageSize;
        let toPage = (pageMultiplier + 1) * this.props.pageSize;
        const limit = Math.ceil(this.props.totalElements / this.props.pageSize);

        if (toPage > limit)
            toPage = limit

        for (let i = fromPage; i < toPage; i++) {
            pageNumberElements.push(
                <button key={i} title={"Go to page: " + (i + 1)}
                    className="app-btn btn btn-link"
                    onClick={(e) => this.onGoToPageSelected(e, i + 1)}>{i + 1}</button>
            );
        }

        return {
            fromPage,
            toPage,
            pageNumberElements
        };
    }

    render() {
        if (this.props.currentPage === undefined || this.props.totalElements === undefined || this.props.pageSize === undefined) return (<div />);

        const builtPageNumbers = this.buildPageNumberElements();
        const limit = Math.ceil(this.props.totalElements / this.props.pageSize);

        return (
            <div className="app-pagination">
                <div>
                    <button title="Go to First Page"
                        className="app-btn btn btn-link"
                        onClick={this.onGoToFirstPage}>&lt;&lt;</button>
                    <button title="Previous Page"
                        className="app-btn btn btn-link"
                        onClick={this.onGoToPreviousPage}>&lt;</button>
                    {builtPageNumbers.pageNumberElements}
                    <button title="Next Page"
                        className="app-btn btn btn-link"
                        onClick={this.onGoToNextPage}>&gt;</button>
                    <button title="Go to Last Page"
                        className="app-btn btn btn-link"
                        onClick={this.onGoToLastPage}>&gt;&gt;</button>
                </div>
                <span>{limit === 0 ? 0 : this.props.currentPage} of {limit} pages</span>
            </div>
        );
    }
}
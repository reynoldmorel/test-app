import React, { Component, MouseEvent } from 'react';
import { Giphy } from '../../model/entities/giphy.entity';
import { Pagination } from '../pagination/pagination.component';
import './gallery.css';

interface GalleryProps {
    source: Giphy[];
    imageIndex: number;
    showViewer?: boolean;
    onClickImage?: (image: Giphy) => void;
    onCloseViewer?: () => void;
    onGoToNextPage?: (page: number) => void;
    onGoToPreviousPage?: (page: number) => void;
    onGoToPageSelected?: (page: number) => void;
    onGoToFirstPage?: (page: number) => void;
    onGoToLastPage?: (page: number) => void;
    onViewerClickNext?: (imageIndex: number) => void;
    onViewerClickPrevious?: (imageIndex: number) => void;
    pageSize?: number;
    totalElements?: number;
    currentPage?: number;
}

export class Gallery extends Component<GalleryProps> {

    constructor(public props: Readonly<GalleryProps>) {
        super(props);

        this.state = {
            imageIndex: 0
        };

        this.onClickImage = this.onClickImage.bind(this);
        this.onCloseViewer = this.onCloseViewer.bind(this);
        this.onViewerClickNext = this.onViewerClickNext.bind(this);
        this.onViewerClickPrevious = this.onViewerClickPrevious.bind(this);
        this.buildThumbnails = this.buildThumbnails.bind(this);
        this.buildViewer = this.buildViewer.bind(this);
    }

    onClickImage(event: MouseEvent<HTMLImageElement>, image: Giphy) {
        if (!this.props.onClickImage) return;

        this.props.onClickImage(image);
    }

    onCloseViewer(event: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLDivElement>) {
        if (!this.props.onCloseViewer) return;

        this.props.onCloseViewer();
    }

    onViewerClickNext(event: MouseEvent<HTMLButtonElement>) {
        if (!this.props.onGoToNextPage ||
            this.props.currentPage === undefined ||
            this.props.pageSize === undefined ||
            this.props.totalElements === undefined ||
            !this.props.onViewerClickNext) return;

        const limit = Math.ceil(this.props.totalElements / this.props.pageSize);

        if (this.props.currentPage === limit && this.props.imageIndex >= this.props.source.length - 1)
            return

        if (this.props.imageIndex + 1 < this.props.pageSize) {
            this.props.onViewerClickNext(this.props.imageIndex + 1);
        } else {
            this.props.onGoToNextPage(this.props.currentPage + 1);
        }
    }

    onViewerClickPrevious(event: MouseEvent<HTMLButtonElement>) {
        if (!this.props.onGoToPreviousPage ||
            this.props.currentPage === undefined ||
            this.props.pageSize === undefined ||
            !this.props.onViewerClickPrevious) return;

        if (this.props.imageIndex - 1 >= 0) {
            this.props.onViewerClickPrevious(this.props.imageIndex - 1);
        } else {
            if (this.props.currentPage - 1 < 1)
            return;
            
            this.props.onGoToPreviousPage(this.props.currentPage - 1);
        }
    }

    private buildThumbnails(): React.ReactNode {
        return (<div key="gallery-thumbnails" className="gallery-thumbnail">
            <div className="gallery-thumbnail-container">
                {this.props.source.length > 0 ?
                    this.props.source.map((g, i) => (
                        g.images && g.images.preview_gif ?
                            (<div key={i} className="gallery-image-container">
                                <img alt={g.title}
                                    src={g.images.preview_gif.url}
                                    className="gallery-image"
                                    width="100"
                                    height="100"
                                    onClick={(e) => this.onClickImage(e, g)} />
                                <span>{g.title}</span>
                            </div>) :
                            <span />
                    )) :
                    (<span className="gallery-image-title">No Data</span>)}
            </div>

            <Pagination pageSize={this.props.pageSize}
                totalElements={this.props.totalElements}
                currentPage={this.props.currentPage}
                onGoToFirstPage={this.props.onGoToFirstPage}
                onGoToLastPage={this.props.onGoToLastPage}
                onGoToNextPage={this.props.onGoToNextPage}
                onGoToPageSelected={this.props.onGoToPageSelected}
                onGoToPreviousPage={this.props.onGoToPreviousPage}
            />
        </div>);
    }

    private buildViewer(): React.ReactNode {
        const currentImage = this.props.source[this.props.imageIndex];

        if (!currentImage.images ||
            !currentImage.images.original)
            return (<div></div>);

        return (<div key="gallery-viewer" className="gallery-viewer">
            <div className="gallery-viewer-close-button-container">
                <button title="Close Viewer"
                    className="gallery-viewer-close-button btn btn-dark"
                    onClick={this.props.onCloseViewer}>x</button>
            </div>
            <div className="gallery-viewer-image-container">
                <video autoPlay={true}
                    loop={true}
                    muted={true}
                    playsInline={true}
                    src={currentImage.images.original.mp4}></video>
                <span className="gallery-viewer-image-title">{currentImage.title}</span>
            </div>
            <div className="gallery-viewer-control-container">
                <button title="Previous"
                    className="btn btn-primary"
                    onClick={this.onViewerClickPrevious}
                    style={{
                        marginRight: "20px"
                    }}>&lt;</button>
                <button title="Next"
                    className="btn btn-primary"
                    onClick={this.onViewerClickNext}
                    style={{
                        marginLeft: "20px"
                    }}>&gt;</button>
            </div>
        </div>);
    }

    render() {
        let imageElements = [this.buildThumbnails()];

        if (this.props.showViewer)
            imageElements.push(this.buildViewer());

        return (
            <div>
                {imageElements}
            </div>
        );
    }
}
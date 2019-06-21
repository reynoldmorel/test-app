import React, { Component } from 'react';
import './App.css';
import { GiphyService, GiphySearchParameters } from './services/giphy/giphy.service';
import { FilterSection } from './components/filter-section/filter-section.component';
import { Gallery } from './components/gallery/gallery.component';
import { Giphy } from './model/entities/giphy.entity';
import project from './project-configuration';
import 'bootstrap/dist/css/bootstrap.css';
import { SelectOption } from './components/filter-selector/filter-selector.component';

interface AppState {
  giphies?: Giphy[];
  totalGiphies?: number;
  currentPage?: number;
  showViewer?: boolean;
  imageIndex?: number;
  selectedOption?: SelectOption;
}

class App extends Component<{}, AppState> {

  private readonly giphyService: GiphyService;
  private readonly searchParameters: GiphySearchParameters = new GiphySearchParameters();

  constructor(public props: Readonly<{}>) {
    super(props);

    this.state = {
      giphies: [],
      totalGiphies: 0,
      currentPage: 1,
      showViewer: false,
      imageIndex: 0,
      selectedOption: project.config.GIPHY_RATING_FILTER_LIST[0]
    }

    this.giphyService = new GiphyService();

    this.onQueryInputSearch = this.onQueryInputSearch.bind(this);
    this.onRatingSelect = this.onRatingSelect.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onClickGiphy = this.onClickGiphy.bind(this);
    this.onCloseViewer = this.onCloseViewer.bind(this);
    this.onViewerImageChange = this.onViewerImageChange.bind(this);
  }

  onQueryInputSearch(searchText: string) {
    this.searchParameters.q = searchText;
    this.searchParameters.offset = 0;

    this.search({
      currentPage: 1,
      imageIndex: 0
    });
  }

  onRatingSelect(selectedOption: SelectOption) {
    this.searchParameters.rating = selectedOption.key;
    this.searchParameters.offset = 0;

    this.search({
      currentPage: 1,
      imageIndex: 0,
      selectedOption
    });
  }

  onPageChange(currentPage: number) {
    if (this.state.currentPage === undefined) return;

    let imageIndex = this.state.imageIndex;

    if (currentPage > this.state.currentPage)
      imageIndex = 0
    else if (currentPage < this.state.currentPage)
      imageIndex = this.searchParameters.limit - 1;

    this.searchParameters.offset = (currentPage - 1) * this.searchParameters.limit;

    this.search({
      currentPage,
      imageIndex
    });
  }

  onViewerImageChange(imageIndex: number) {
    this.setState({
      imageIndex
    });
  }

  onClickGiphy(giphy: Giphy) {
    if (this.state.giphies === undefined) return;

    this.setState({
      showViewer: true,
      imageIndex: this.state.giphies.indexOf(giphy)
    });
  }

  onCloseViewer() {
    this.setState({
      showViewer: false
    });
  }

  private search(state?: AppState) {
    this.giphyService.search(this.searchParameters).then(
      response => {

        if (!state)
          state = this.state

        let currentPage = state.currentPage === undefined ? this.state.currentPage : state.currentPage;
        let imageIndex = state.imageIndex === undefined ? this.state.imageIndex : state.imageIndex;

        if (response.data.pagination.total_count === 0) {
          currentPage = 1;
          imageIndex = 0;
        }

        this.setState({
          giphies: response.data.data,
          totalGiphies: response.data.pagination.total_count,
          imageIndex,
          currentPage,
          selectedOption: state.selectedOption || this.state.selectedOption
        });
      }
    ).catch(
      error => {
        console.log(error);
      }
    );
  }

  componentDidMount() {
    this.search();
  }

  render() {
    if (this.state.giphies === undefined ||
      this.state.imageIndex === undefined ||
      this.state.selectedOption === undefined)
      return (<div />);

    return (
      <div className="app">
        <div className="app-container">
          <header className="app-header">
            <h1>{project.config.APP_NAME}</h1>
            <span>By {project.config.COMPANY_NAME}</span>
          </header>

          <div>
            <FilterSection querySearchDelay={700}
              onQuerySearch={this.onQueryInputSearch}
              queryPlaceHolderText={"Search by text"}
              onRatingSelect={this.onRatingSelect}
              ratingSource={project.config.GIPHY_RATING_FILTER_LIST}
              ratingSelectedOption={this.state.selectedOption}
              ratingText={"Filter by Rating"} />

            <Gallery source={this.state.giphies}
              imageIndex={this.state.imageIndex}
              showViewer={this.state.showViewer}
              onClickImage={this.onClickGiphy}
              onCloseViewer={this.onCloseViewer}
              pageSize={this.searchParameters.limit}
              totalElements={this.state.totalGiphies}
              currentPage={this.state.currentPage}
              onGoToFirstPage={this.onPageChange}
              onGoToLastPage={this.onPageChange}
              onGoToNextPage={this.onPageChange}
              onGoToPreviousPage={this.onPageChange}
              onGoToPageSelected={this.onPageChange}
              onViewerClickNext={this.onViewerImageChange}
              onViewerClickPrevious={this.onViewerImageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

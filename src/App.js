import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Row, Col, Container, Form, Card, Spinner } from "react-bootstrap";
import TitleBar from "./components/TitleBar";
import ImageModal from "./components/ImageModal";
import { getImages, searchImages } from "./apis/index";
import InfiniteScroll from "react-infinite-scroller";
import debounce from "lodash.debounce";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      per_page: 12,
      list: [],
      search: "",
      showModal: false,
      selectedImage: { urls: { raw: "" } },
    };
    this.searchChange = debounce(this.handleSearchChange, 800);
  }

  componentDidMount = () => {
    this.fetchImages();
  };

  fetchImages = () => {
    const page = this.state.page + 1;
    const params = { page: page, per_page: this.state.per_page };
    getImages(params).then((response) => {
      let list;
      if (page === 1) list = response.data;
      else list = [...this.state.list, ...response.data];
      this.setState({ list, page });
    });
  };

  imageSearch = (firstSearch) => {
    const page = this.state.page + 1;
    const params = {
      page: page,
      per_page: this.state.per_page,
      query: this.state.search,
    };
    searchImages(params).then((response) => {
      let list = [];
      if (firstSearch) list = response.data.results;
      else list = [...this.state.list, ...response.data.results];
      this.setState({ list, page });
    });
  };

  handleSearchChange = (event) => {
    const val = event.target.value;
    console.log("val", val);
    if (val && val !== null && val.length) {
      const firstSearch =
        this.state.search === null || !this.state.search.length;
      this.setState({ search: val }, () => {
        this.imageSearch(firstSearch);
      });
    } else {
      this.setState({ page: 0 }, () => {
        this.fetchImages();
      });
    }
  };

  openModal = (item) => {
    console.log(item.urls);
    this.setState({ selectedImage: item, showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  handleDownload = () => {
    window.open(this.state.selectedImage.links.download, "_blank");
  };

  render() {
    const loadImages = this.state.list.map((item) => (
      <Col md="3" key={item.id} style={{ padding: 20 }}>
        <Card className="image-card" onClick={() => this.openModal(item)}>
          <Card.Img
            variant="top"
            src={item.urls.thumb}
            className="card-image"
          />
          <Card.Body>
            <Card.Text>{item.alt_description}</Card.Text>
            <Card.Text>Likes - {item.likes}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ));

    return (
      <Container fluid style={{ padding: 0 }}>
        <TitleBar />
        <div className="container-2">
          <div className="search-fixed">
            <div style={{ paddingLeft: 10 }}>
              Browse images. These images are searched using
              <a
                href="https://unsplash.com/developers"
                target="blank"
                style={{ marginLeft: 5, marginRight: 2 }}>
                Unsplash
              </a>{" "}
              API.
            </div>
            <div className="search-row">
              <Form className="search-form">
                <div style={{ width: 155 }}>Search for images -</div>
                <Form.Control
                  placeholder="Search for images"
                  style={{ width: 350 }}
                  onChange={this.searchChange}
                />
              </Form>
            </div>
          </div>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.state.search ? this.imageSearch : this.fetchImages}
            hasMore={true || false}
            initialLoad={false}
            loader={
              <div className="loader-tab" key={0}>
                <Spinner animation="border" />
              </div>
            }>
            <Row className="image-row">{loadImages}</Row>
          </InfiniteScroll>
        </div>
        <ImageModal
          show={this.state.showModal}
          item={this.state.selectedImage}
          onHide={this.closeModal}
          downloadImage={this.handleDownload}
        />
      </Container>
    );
  }
}

export default App;

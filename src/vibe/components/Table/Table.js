import React, {Component} from 'react';
import {
  Card,
  CardBody,
  Col,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table
} from 'reactstrap';
import ArticleService from '../../../service/ArticleService';

const order = [
  "10",
  "25",
  "50",
  "100"
]

class TableComponent extends Component {

  constructor(props) {
    super(props)
    this.articleService = new ArticleService()
    this.getData = this.getData.bind(this)
    this.state = {
      data: {
        data: [],
        totalPage: 0,
        page: 1,
        nextPage: 1,
        prevPage: 1,
        limit: 10
      }
    }
  }

  componentDidMount() {
    this.getData()

  }

  getData(page = 1, limit = 10) {
    let {url} = this.props

    this.articleService.getDataArticle(url + "&page="+ page +"&size=" + limit).then(res => {
      let data = res.data
      this.setState({
        data: {
          data: data.records,
          totalPage: data.total_page,
          page: data.page,
          nextPage:data.next_page,
          prevPage: data.prev_page,
          limit: data.limit
        }
      })
    })
  }

  render() {
    let {columns, url} = this.props
    let {data} = this.state.data
    return (
        <Card>
            <CardBody>
                <Table striped>
                    <thead>
                        <tr>
                          {columns.map(elm => {
                            return (
                              <th className={elm.class ? elm.class : ""} style={elm.style ? elm.style : {}}>{elm.text}</th>
                            )
                          })}
                        </tr>
                    </thead>
                    <tbody>
                      {data.length === 0 ? (
                        <div>No records in database</div>
                      ):data.map((elm) => {
                        return (
                          <tr>
                            {columns.map(td => {
                              return (
                                <td>{td.formatter ? td.formatter(elm) : elm[td.column]}</td>
                              )
                            })}
                          </tr>
                        )
                      })}
                    </tbody>
                </Table>
                <Row>
                  <Col sm="1">
                  <Input type="select" name="select" id="exampleSelect" onChange={(e) => this.getData(this.state.data.page, e.target.value)}>
                    {order.map((elm) => {
                      return (<option>{elm}</option>)
                    })}
                  </Input>
                  </Col>
                  <Col sm="11">
                    <Pagination className="float-right" aria-label="Page navigation example">
                      <PaginationItem disabled>
                        <PaginationLink previous href="#" />
                      </PaginationItem>
                      <PaginationItem active>
                        <PaginationLink href="1">1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink next href="#" />
                      </PaginationItem>
                    </Pagination>
                  </Col>
                </Row>
            </CardBody>
        </Card>
    )
  }
}

export default TableComponent;

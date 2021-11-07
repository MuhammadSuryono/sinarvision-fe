import React, { useEffect, useState } from 'react';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Input,
    Button,
    CardFooter,
} from 'reactstrap';
import FA from 'react-fontawesome';
import ArticleService from '../../service/ArticleService';


function PostActions() {
    return (
      <div className="p-t-sm">
        <Button color="link" className="m-r text-muted">
          <FA name="thumbs-up" /> Like
        </Button>
        <Button color="link" className="text-muted">
          <FA name="eye" /> Read More
        </Button>
      </div>
    );
  }

const AVATARS = {
    "Entertaiment": {
        fa: "gamepad",
        bg: "bg-danger"
    },
    "Food": {
        fa: "pizza-slice",
        bg: "bg-orange"
    },
    "Books": {
        fa: "book",
        bg: "bg-primary"
    }
}
  
export default function PreviewPage () {
    const [dataNews, setDataNews] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [page, setPage] = useState(1)

    useEffect(() => {
        getDataNews()
    }, [])


    const getDataNews = () => {
        const articleService = new ArticleService()

        articleService.getDataArticle("?status=Publish&page=" + page).then(res => {
            let data = res.data
            setDataNews(data.records)
            setTotalPage(data.total_page)
        })

    }

    return (
        <div>
            <h3 className="m-b">New Post</h3>
            <Row>
                <Col md={8}>
                    <Card>
                        <CardBody>
                            {dataNews.length > 0 && dataNews.map((elm) => {
                                return (
                                    <Card>
                                        <CardHeader>
                                        <div className="m-r-sm inline-block">
                                            <div className={`avatar avatar-base bg-orange`}>
                                            <div className="user-initials"><FA name="gamepad" /></div>
                                            </div>
                                        </div>
                                        <h5 className="inline m-b-none m-t-none">{elm.title.toUpperCase()}</h5>
                                        </CardHeader>
                                        <CardBody>
                                        <div>
                                            { <div dangerouslySetInnerHTML={{__html: elm.content}} /> }
                                        </div>
                                        <PostActions />
                                        </CardBody>
                                    </Card>
                                )
                            })}
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <CardHeader>Publish</CardHeader>
                        <CardBody>
                            <div>
                                <strong>Status:</strong> Draft
                                </div>
                            <hr />
                            
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader>Search</CardHeader>
                        <CardBody>
                            <FormGroup>
                                <Input type="text" name="select" id="exampleSelect4" />
                            </FormGroup>
                            <Button>Search</Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
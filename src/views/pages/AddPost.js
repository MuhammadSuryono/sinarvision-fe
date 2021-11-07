import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React, { useState } from 'react';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Label,
    Input,
    Button,
    UncontrolledAlert,
} from 'reactstrap';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import ArticleService from '../../service/ArticleService';

const CREATE = 1
const UPDATE = 2

export default function AddPostPage ({typeForm = CREATE, data = {}}) {
    const [title, setTitle] = useState(data.title)
    const [content, setContent] = useState(data.content)
    const [category, setCategory] = useState(data.category)
    const [status, setStatus] = useState(data.status)
    const [alert, setAlert] = useState(false)
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [listCategory, setListCategory] = useState([
        {
            title: "Entertainment",
            value: "Entertainment"
        },
        {
            title: "Food",
            value: "Food"
        },
        {
            title: "Books",
            value: "Books"
        }
    ])

    const createPosts = (statusPost) => {
        let value = ""
        if (content !== undefined) {
            let currentContent = content.getCurrentContent()
            let contentRaw = convertToRaw(currentContent)
            value = currentContent.hasText() ? draftToHtml(contentRaw) : ""
        }

        let bodyPayload = {
            "title": title,
            "category": category === undefined ? listCategory[0].value : category,
            "status": statusPost,
            "content": value
        }

        let articleService = new ArticleService()
        articleService.createPosts(bodyPayload).then((res) => {
            if (res.is_success) {
                setAlert(true)
                initState()
                hideAlerts()
            }
        })
    }

    const hideAlerts = () => {
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    }

    const initState = () => {
        setTitle("")
        setCategory(listCategory[0].value)
        setEditorState(EditorState.createWithContent(
            ContentState.createFromBlockArray(
                convertFromHTML('<p>Popop</p>')
            )
        ))
        setContent("")
    }

    return (
        <div>
            <h3 className="m-b">New Post</h3>
            <Row>
                <Col md={8}>
                    {alert && (
                        <UncontrolledAlert color="success">
                        Success create new post
                        </UncontrolledAlert>
                    )}
                    <Card>
                        <CardBody>
                            <FormGroup>
                                <Label for="exampleText">Title</Label>
                                <Input type="text" name="text" value={title} onChange={(e) => setTitle(e.target.value)} id="exampleText" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleText">Content</Label>
                                <Editor
                                initialContentState={content}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={(ctn) => {
                                    setContent(ctn)
                                }}
                                />
                            </FormGroup>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <CardHeader>Published Information</CardHeader>
                        <CardBody>
                            {typeForm === UPDATE && (
                                <>
                                    <div>
                                        <strong>Status:</strong> Draft
                                        </div>
                                    <hr />
                                    <div>
                                        <strong>Word Count:</strong> 329
                                    </div>
                                </>
                            )}
                            <hr />
                            <div>
                            <FormGroup>
                                <Label for="exampleSelectMulti">Category</Label>
                                <Input type="select" name="select" id="exampleSelect3" onChange={(e) => setCategory(e.target.value)}>
                                    {listCategory.map((elm) => {
                                        return (<option value={elm.value}>{elm.title}</option>)
                                    })}
                                </Input>
                            </FormGroup>
                            </div>
                            <hr />
                            <Button block color="primary" onClick={() => createPosts("Publish")}>Publish</Button>
                            <Button block color="secondary" onClick={() => createPosts("Draft")}>Draft</Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
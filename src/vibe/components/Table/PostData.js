import React from "react";
import { Button, UncontrolledAlert } from "reactstrap";
import TableComponent from "./Table";
import FA from "react-fontawesome";
import ArticleService from "../../../service/ArticleService";


class PostsData extends React.Component {
    constructor(props) {
        super(props)
        this.deletePost = this.deletePost.bind(this)
        this.actionFormmatter = this.actionFormmatter.bind(this)
        this.state = {
            table: {
                columns: [
                    {
                        text: "Title",
                        column: "title",
                    },
                    {
                      text: "Category",
                      column: "category",
                   },
                   {
                      text: "Action",
                      column: "#",
                      formatter: this.actionFormmatter
                   }
                ],
                url: props.url
            },
            alert: false
        }
    }

    actionFormmatter(row) {
        return (
            <>
                <Button color="primary"><FA name="pencil" /> Edit</Button>&nbsp;
                <Button color="danger" onClick={() => this.deletePost(row.id)}><FA name="trash" /> Delete</Button>
            </>
        )
    }

    deletePost(id) {
        let articleService = new ArticleService()
        articleService.deletePost(id).then((res) => {
            if (res.is_success) {
                this.setState({
                    alert: true,
                    table: {
                        columns: this.state.table.columns,
                        url: this.props + "&refresh=" + new Date().getTime()
                    }
                })

                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            }
        })
    }

    render() {
        return (
            <div>
                {this.state.alert && (
                     <UncontrolledAlert color="success">Success Delete Data Post</UncontrolledAlert>
                )}
                <TableComponent columns={this.state.table.columns} url={this.state.table.url} />
            </div>
        )
    }
}

export default PostsData
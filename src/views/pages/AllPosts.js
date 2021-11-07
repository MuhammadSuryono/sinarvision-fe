import React, { Component } from 'react';
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Badge } from 'reactstrap';
import PostData from '../../vibe/components/Table/PostData';
import ArticleService from '../../service/ArticleService';

class AllPostsPage extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.articleService = new ArticleService()
    this.state = {
      activeTab: 'Publish',
      setTabs: false,
      tabs: [
          {
              "name": "Published",
              "total": 0,
              "id": "Publish",
              "color": "primary"
          },
          {
            "name": "Drafts",
            "total": 0,
            "id": "Draft",
            "color": "warning"
          },
          {
            "name": "Thrased",
            "total": 0,
            "id": "Thrash",
            "color": "danger"
          },
      ],
      
    };
  }

  componentDidMount(){
    let tabs = this.state.tabs
    tabs.forEach((data, index) => {
      this.getCountTabs(data.id).then(data => tabs[index].total = data)
    })

    this.setState({
      tabs: tabs,
      setTabs: true
    })
  }

  componentDidUpdate(prevProps, prevState) {
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  getCountTabs(status) {
    return this.articleService.getCountStatus(status).then((res) => res.data)
  }
  render() {
    return (
      <div>
        <Nav tabs>
            {this.state.setTabs && this.state.tabs.map((elm) => {
                return (
                    <NavItem>
                        <NavLink
                        href="#"
                        className={classnames({ active: this.state.activeTab === elm.id })}
                        onClick={() => {
                            this.toggle(elm.id);
                        }}
                        >
                        {elm.name} <Badge color={elm.color}>{elm.total}</Badge>
                        </NavLink>
                    </NavItem>
                )
            })}
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
            {this.state.setTabs && this.state.tabs.map((elm) => {
                return (
                    <TabPane tabId={elm.id}>
                        <Row>
                            <Col sm="12">
                                {this.state.activeTab === elm.id && (
                                    <PostData url={`?status=${elm.id}`} />
                                )}
                            </Col>
                        </Row>
                    </TabPane>
                )
            })}
        </TabContent>
      </div>
    );
  }
}

export default AllPostsPage;

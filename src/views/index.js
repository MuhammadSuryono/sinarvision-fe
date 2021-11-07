import AllPostsPage from './pages/AllPosts';
import AddPostPage from './pages/AddPost';
import PreviewPage from './pages/Preview';

// See React Router documentation for details: https://reacttraining.com/react-router/web/api/Route
const pageList = [
  {
    name: 'All Posts',
    path: '/pages/all-posts',
    component: AllPostsPage,
  },
  {
    name:"Add New Post",
    path: "/pages/add-new",
    component: AddPostPage
  },
  {
    name:"Preview",
    path: "/pages/preview",
    component: PreviewPage
  }
];

export default pageList;

import React, {Component} from 'react';
import Articles from '../components/Article';
import FormInput from '../components/FormInput';
import axios from 'axios';


class ArticleListView extends Component {

    state = {
      articles: []
    }

    componentDidMount(){
      axios.get('/api/article')
        .then(res =>{
          this.setState({
            articles: res.data
          });
          console.log(res.data);
      })
    }
  render() {
    return (
      <div>
        <Articles data = {this.state.articles} />
        <br />
        <FormInput 
          requestType = "post" 
          _id = {null}
          btnText = "Create"
          headline = "Create a new article" 
          message = "Article created Successfully" />
      </div>
    )
  }
}

export default ArticleListView;
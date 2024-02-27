import React, {Component} from 'react';
import axios from 'axios';
// import { Card } from 'antd';
import { Card, Button } from 'antd';
import FormInput from '../components/FormInput';

class ArticleDetail extends Component {

    state = {
      article: {}
    }

// For get data from api
    componentDidMount(){
        const articleID = this.props.match.params._id;
        axios.get(`/api/article/${articleID}`)
            .then(res =>{
                this.setState({
                    article: res.data
                });
            }
            ) 
             
    }
// delete any article from api
    handleDelete = (event) => {
        const articleID = this.props.match.params._id;
        const confirm = window.confirm("Are you sure?")
        if(confirm){
          axios.delete(`http://localhost:3000/api/article/${articleID}`)
            .then(res=>{
              // console.log(res)
              if(res.status===200){
                this.props.history.push('/');
                // window.location.reload();
              }
             
            })
            .catch(err=>{
              console.log(err)
            })
          
        }
      event.preventDefault();

    }
  render() {
    return (
      <div>
          <Card title = {this.state.article.title} >
            <p> {this.state.article.description} </p>
          </Card>
          <FormInput 
            requestType = "put" 
            _id = {this.props.match.params._id}
            btnText = "Update"
            headline = "Edit and Update article"
            message = "Update Successfull" /> 
           <span> 
          <form onSubmit = {this.handleDelete}>
            <Button type="danger" htmlType="submit" >
            Delete
            </Button>
          </form>
          </span>
      </div>
    )
  }
}

export default ArticleDetail;
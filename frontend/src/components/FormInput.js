import React, {Component} from 'react';
import axios from 'axios';



import {
  Form, Input, Button,
} from 'antd';

const { TextArea } = Input;



class FormInput extends Component {
  state = {
    isSubmitted : false,
    error : false
  }
  
  handleChange = event => {
    this.setState({ name: event.target.value });
  }

  handleSubmit = (event, requestType, articleID) => {
    
    // after submition, for prevent page loading used this method
    // event.preventDefault();

  const title = event.target.elements.title.value;
  const content = event.target.elements.content.value;

  switch(requestType){
    // for post request of article 
    case 'post':
            return axios.post(`/api/article`, { 
              title: title,
              description: content
            })
                  .then(res => {
                    this.setState({
                      isSubmitted : true,
                      error : false 
                      })
                    console.log(res)
                    }
                    )

                  .catch (error => {
                    this.setState({
                      isSubmitted : false,
                      error : true 
                      })
                    console.err(error)
                  }
                  );

    // for edit or update request of article 
    case 'put':
            return axios.put(`/api/article/${articleID}/`, { 
              title: title,
              description: content })
                  .then(res => {
                    this.setState({
                      isSubmitted : true,
                      error : false})
                      console.log(res)
                    }
                    )
                  .catch (error => {
                    this.setState({
                      isSubmitted : false,
                      error : true 
                      })
                      console.err(error)
                    }
                    );

      default:
        
            //do something if you wish...
    }
  
  
}

  render() {
    return (
      <div className='container'>
        
        <form onSubmit={(event) => this.handleSubmit(
          event,
          this.props.requestType,
          this.props._id )}>
        <br />
          <h1> {this.props.headline} </h1>
          <Form.Item label = "Title">
          <Input 
                type = "text" 
                name = "title" 
                onChange = {this.handleChange} 
                placeholder = "Please enter the title here" 
                required />
          </Form.Item>

          <Form.Item label = "Article">
          <TextArea  
                rows = {4}
                type = "text" 
                name = "content" 
                onChange = {this.handleChange} 
                placeholder = "Enter your article" 
                required />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="login-form-button">
            {this.props.btnText}
          </Button>
          <br /> 
          {this.state.isSubmitted && <p>{alert(this.props.message)}</p>} 
          {this.state.error && <p>Error Occured</p>}
          <br />
          
        </form>
      </div>
    );
  }
}

export default FormInput;
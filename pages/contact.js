import { Component } from 'react'

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitting: false,
      submitted: false,
      name: "",
      email: "",
      message: "",
      errors: {
        name: '',
        email: '',
        message: '',
      }
    }
  }


  handleChange(e) {
    const { errors } = this.state
    const { name, value } = e.target;
    console.log(value)
    switch (name) {
      case 'name':
        errors.name =
          this.state.name.length > 5 ? '' : errors.name;
        break;
      case 'email':
        errors.email =
          validEmailRegex.test(this.state.email) ? '' : errors.email
        break;
      case 'message':
        errors.message =
          this.state.message.length > 20 ? '' : errors.message ;
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  }

  handleOnblur(e) {
    const { errors } = this.state
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        errors.name =
          value.length < 5
            ? 'Name must be 5 characters long!'
            : '';
        break;
      case 'email':
        errors.email =
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'message':
        errors.message =
          value.length < 20
            ? 'Message must be 20 characters long!'
            : '';
        break;
      default:
        break;
    }
    this.setState({ errors });
  }

  validateForm(errors) {
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }

  submitForm() {
    const { name, email, message, submitted, submitting } = this.state
    const data = {
      name,
      email,
      message
    }
    
    if (!submitted && !submitting) {
      this.setState({submitting:true})
      fetch('/api/contact', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((res) => {
        res.status === 200 ? this.setState({ submitted: true,submitting:false}) : ''
      }).catch((err)=>console.log(error))
    }

  }
  render() {
    console.log(this.state)
    const { errors,submitting } = this.state
    return <div className="container mt-5 contact">
      <div className="row mt-5">
        <div className="contact col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 mt-xl-5 mt-lg-5 mx-auto">
          <form onSubmit={e => {
            e.preventDefault()
            this.validateForm(errors) && this.submitForm()
          }}>
            <label htmlFor="name">Name</label>
            <div className="form-group">
              <input 
                type="text" 
                className="form-control" 
                name="name" 
                placeholder="Enter Name" 
                onBlur={(e) => this.handleOnblur(e)} 
                onChange={(e) => this.handleChange(e)} 
                />
              {errors.name.length > 0 &&
                <span className='error'>{errors.name}</span>}
            </div>
            <label htmlFor="email">Email</label>
            <div className="form-group" >
              <input type="text" 
                noValidate 
                className="form-control"
                name="email" 
                placeholder="Enter email"
                onBlur={(e) => this.handleOnblur(e)}
                onChange={(e) => this.handleChange(e)} />
              {errors.email.length > 0 &&
                <span className='error'>{errors.email}</span>}
            </div>
            <label>Message</label>
            <div className="form-group">
              <textarea 
                placeholder="Enter message" 
                className="form-control" noValidate rows="5" name="message" 
                onBlur={(e) => this.handleOnblur(e)} 
                onChange={(e) => this.handleChange(e)}>
              </textarea>
              {errors.message.length > 0 &&
                <span className='error'>{errors.message}</span>}
            </div>
            <button type="submit" disabled={submitting} className="btn float-right">Submit</button>
          </form>
        </div>
      </div>
    </div>
  }
}


export default Contact
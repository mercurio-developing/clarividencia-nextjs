import { Component } from 'react'
import Router from 'next/router'

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
          this.state.message.length > 20 ? '' : errors.message;
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
            ? 'Nombre tiene que tener almenos 5 caracteres!'
            : '';
        break;
      case 'email':
        errors.email =
          validEmailRegex.test(value)
            ? ''
            : 'El email no es valido';
        break;
      case 'message':
        errors.message =
          value.length < 20
            ? 'El mensaje debe tener almenos 20 caracteres!'
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


  formIsFilled() {
    const { name, email, message,errors } = this.state
    if(name.length === 0){
      errors.name = "Por favor inserta un nombre"
    }else if(email.length === 0){
      errors.email = "Por favor inserta un email"
    }else if(message.length === 0){
      errors.message = "Por favor inserta un mensaje"
    }
    this.setState({errors})
  }

  submitForm() {
    const { name, email, message, submitted, submitting } = this.state
    const data = {
      name,
      email,
      message
    }
      
    if (!submitted && !submitting) {
      this.setState({ submitting: true })
      fetch('/api/contact', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((res) => {
        res.status === 200 ? this.setState({ submitted: true, submitting: false },()=>{
          if(this.state.submitted){
            setTimeout(() => {
              Router.push("/")
            }, 5000);
          }
        }) : ''
      }).catch((err) => console.log(error))
    }

  }
  render() {
    const { errors, submitting, submitted } = this.state
    return <div className="container mt-5 contact">
      <div className="row mt-5 h-100">
        {submitted ? <div className="col-12 mt-5 mx-auto text-center"> <p className="h4 my-auto mx-auto">Tu mensaje fue enviado exitosamente.</p></div> :
          <div className="contact col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 mt-xl-3 mt-lg-3 mx-auto"><form onSubmit={e => {
            e.preventDefault();
            this.formIsFilled();
            this.validateForm(errors) && this.submitForm()
          }}>
            <label htmlFor="name">Nombre</label>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Insertar Nombre"
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
                placeholder="Insertar Email"
                onBlur={(e) => this.handleOnblur(e)}
                onChange={(e) => this.handleChange(e)} />
              {errors.email.length > 0 &&
                <span className='error'>{errors.email}</span>}
            </div>
            <label>Mensaje</label>
            <div className="form-group">
              <textarea
                placeholder="Insertar Mensaje"
                className="form-control" noValidate rows="5" name="message"
                onBlur={(e) => this.handleOnblur(e)}
                onChange={(e) => this.handleChange(e)}>
              </textarea>
              {errors.message.length > 0 &&
                <span className='error'>{errors.message}</span>}
            </div>
            <button type="submit" disabled={submitting || !this.validateForm(this.state.errors)} className="btn float-right">Enviar</button>
          </form>        
        </div>
        }
      </div>
    </div>
  }
}


export default Contact
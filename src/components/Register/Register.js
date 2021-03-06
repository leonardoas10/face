import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: ''
    }
  }

  onNameChange = (event) => {
    let key = event.KeyCode || event.which;
    let tecla = String.fromCharCode(key).toLowerCase();
    let letters = "áéíóúabcdefghijklmnñopqrstuvwxyz";
    if (letters.indexOf(tecla) === -1) {
      alert("ONLY ENTER LETTERS");
      event.preventDefault();
      event.stopPropagation();
      return false;
    } 
  }

  updateName = (event) => {
    this.setState({ name: event.target.value}, () => {
      console.log("name", this.state.name)
  });
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
    let text = event.target.value;
    
    if (text.includes("@gmail.com") || text.includes("@hotmail.com")) {
      document.getElementById("email-address").style = "hover-bg-black";
      document.getElementById("notvalid").style.display = "none";
    }
    else {
      document.getElementById("email-address").style.backgroundColor = "red"; 
      document.getElementById("notvalid").style.display = "block";
    }
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  onSubmitSignIn = () => {
    fetch('https://rocky-hollows-20234.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user)
          this.props.onRouteChange('home');
        }
      })
  }

  render() {
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onKeyPress={this.onNameChange} 
                  onChange={this.updateName}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
                
                <label id="notvalid" className="db fw6 lh-copy f6" htmlFor="email-address">Enter @gmail.com or @hotmail.com</label>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
                id="register"
                onClick={this.onSubmitSignIn}
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
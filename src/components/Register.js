import React, {Component} from 'react';

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      name: '',
      error: '',
      invalidEmail: '',
      loading: 'no'
    }
  }

  Emailfield = (event) => {
    this.setState({email: event.target.value})
  }

  Passwordfield = (event) => {
    this.setState({password: event.target.value})
  }

  Namefield = (event) => {
    this.setState({name: event.target.value})
  }

  Validation = () => {
    if( !this.state.name || !this.state.email || !this.state.password) {
      this.setState({error: 'not filled'})
    }

    else if(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email)){

        this.setState({loading: 'yes'})

        fetch('https://shrouded-shelf-04134.herokuapp.com/register', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
          })
        })
        .then(res => res.json())
        .then(data => {
            if(data=== 'unable to register') {
              this.setState({loading: 'no'})
              this.setState({error: 'unable to register'})
            }
            else {
              this.props.Registered(data)
            }
          
        })
    }

    else{
      this.setState({invalidEmail: 'yes'})
    }   
}  

  render() {
    const disp = () => {
      switch( this.state.loading ) {

        case "no":  
            return(  
              <>
                <nav style={{display:'flex', justifyContent:'flex-end'}}>
                  <p 
                    className="f5 underline pointer tr link dim white db pr3"
                    onClick={() => this.props.Changepage('application')} >
                    skip
                  </p>
                </nav>
                <div className="br3 ba whitee black b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                  <main className="pa4 black-80">
                    <div className="measure">
                      <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                      <legend className="tc f4 fw6 ph0 mh0">Register</legend>
                      <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="Name">Name</label>
                        <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="text"
                            name="Name"  
                            id="Name"
                            onChange={this.Namefield} />
                      </div>
                      <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                          className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                          type="email" 
                          name="email-address"  
                          id="email-address"
                          onChange={this.Emailfield} />
                      </div>
                        {    this.state.invalidEmail
                                ?
                          <p className='pl2 pb2 red' >Please enter a valid email id</p>
                                :
                                ''
                        }
                      <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                          className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                          type="password" 
                          name="password"  
                          id="password"
                          onChange={this.Passwordfield} />
                      </div>
                      </fieldset>
                {    this.state.error === 'not filled' 
                                ?
                  <p className='pl4 pb2 red' >Please fill all the fields</p>
                                :
                              this.state.error === 'unable to register'
                                              ?
                                              <>
                          <p className='pl4 pb2 red' >Unable to register. Try with different values</p>
                          
                                              </> 
                                              :                   
                                ''
                }
                <div className="center tc">
                  <input 
                    className="center tc b ph3 pv2 input-reset ba b--black bb grow pointer f6 dib" 
                    type="submit" 
                    value="Register"
                    onClick={this.Validation}/>
                </div>   
                <div className="lh-copy mt3">
                  <p 
                    className="underline f6 pointer tc link dim black db"
                    onClick={() =>this.props.Changepage('signin')}>
                    Signin
                  </p>
                </div>
                </div>
                </main>
                </div>
              </>
            )

      case "yes": return(
        <div className="tc pt6">
          <h1> Registering...</h1>
          <h3> Please wait </h3>
        </div>
        )
      
      default: return <h1>Something went wrong. Please refresh the page</h1>
      }
    }

  return(
        <>
          { disp() }
        </>
      );
  }
}


export default Register;
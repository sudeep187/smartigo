import React, {Component} from 'react';

class Signin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      loading: 'no',
      incorrectCreds: ''
    }
  }

  Emailfield = (event) => {
    this.setState({email: event.target.value})
  }

  Passwordfield = (event) => {
    this.setState({password: event.target.value})
  }

  Validation = () => {
    if( !this.state.email || !this.state.password ){
      this.setState({incorrectCreds: 'yes'})
    }

    else{
      this.setState({loading: 'yes'})

      fetch('https://shrouded-shelf-04134.herokuapp.com/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
        })
      })
      .then(res => res.json())
      .then(data =>{
        if(data === 'invalid creds'){
          this.setState({loading: 'no'})
          this.setState({incorrectCreds: 'yes'})
        } 
        else {
           this.props.Sign_in(data)
        }
      
      })
    }
  }
  

  render(){
    const disp = () => {
      switch(this.state.loading){

        case "no": return(
          <> 
            <nav style={{display:'flex', justifyContent:'flex-end'}}>
            <p 
                className="f5 underline pointer tr link dim white db pr3"
                onClick={()=>this.props.Changepage('application')} >
                skip
            </p>
            </nav>
            <div className="br3 ba whitee black b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
              <main className="pa4 black-80">
                <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            
                 <legend className="tc f4 fw6 ph0 mh0">Sign In</legend>
            
                    <div className="mt3">
                
                      <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                      <input 
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="email" 
                        name="email-address"  
                        id="email-address"
                        onChange={this.Emailfield} />
                    </div>
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
                    {    this.state.incorrectCreds 
                                ?
                      <p className='tc pb2 red' >Incorrect credentials</p>
                                :
                                ''
                    }
                <div className="center tc">
                  <input 
                    className="center tc b ph3 pv2 input-reset ba b--black bb grow pointer f6 dib" 
                    type="submit" 
                    value="Sign in"
                    onClick={this.Validation} />
                </div>   
                <div className="lh-copy mt3">
                  <p 
                    className="underline f6 pointer tc link dim black db"
                    onClick={ ()=>this.props.Changepage('register')} >
                    Register
                  </p>
                </div>
               </div>
              </main>
            </div>
          </>
        )

        case "yes": return(
                      <div className="tc pt6">
                        <h1> Signing in...</h1>
                        <h2> Please wait </h2>
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


export default Signin;
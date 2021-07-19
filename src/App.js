import React, { Component } from 'react'; 
import Particles from 'react-particles-js';
import './App.css';
import Mainpage from './components/Mainpage';
import Navigation from './components/Navigation';
import Signin from './components/Signin';
import Register from './components/Register';
import Icon from './components/Icon';
import Urlbar from './components/Urlbar';
import Imagebox from './components/Imagebox';
import Count from './components/Count';

const particleParams = {
	particles: {
		number: {
			value:150,
			density: {
				enable:true,
				value_area:800
			}
		}
	}
}

class App extends Component {
  constructor(){
    super()
    this.state = {
      nav: '',
      page: 'mainpage',
      box: {},
      url: '',
      success: '',
      detectstate: 'default',
      user: {
              id: '',
              name: '',
              entries: ''
            }
    }
  }

  Changepage = (pagee) => {
    this.Clean();
    this.setState({page: pagee});
  }

  Calculation = (data) => {
    const boxy = data.outputs[0].data.regions[0].region_info.bounding_box;
    if(boxy) {
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
          leftcol: boxy.left_col * width,
          toprow: boxy.top_row * height,
          rightcol: width - (boxy.right_col * width),
          bottomrow: height - (boxy.bottom_row * height)
      }
    }
  }

  boxy = (data) =>{
    this.setState({box: data});
  }

  Urlchange = (event) => {
    this.setState({url: event.target.value})
    this.setState({box: {}})
  }

  Clean = () => {
    this.setState({page: 'signin'})
    this.setState({url: ''})
    this.setState({box: {}})
    this.setState({detectstate: 'default'})
    this.setState({user: {
                          id: '',
                          name: '',
                          entries: ''
                         }
                }) 
  }

  Sign_in = (user_data) => {
    if( user_data !== 'invalid creds' ) {
        this.setState( { user: user_data } );
        this.setState({page: 'application'})
    }
  }

  Registered = (user_data) => {
    if( user_data !== 'invalid creds' ) {
      this.setState( { user: user_data } );
      this.setState({page: 'application'})
    }
  }

  onDetect = () => {  
    if(this.state.url) {
      this.setState({detectstate: 'yes'})

        fetch('https://shrouded-shelf-04134.herokuapp.com/apicall',{
                  method: 'post',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({
                      url: this.state.url
                    })
        })
        .then(resp => resp.json())
        .then(response => {
          this.boxy(this.Calculation(response))

          if(this.state.user.id){
            fetch('https://shrouded-shelf-04134.herokuapp.com/image',{
                      method: 'put',
                      headers: {'Content-Type': 'application/json'},
                      body: JSON.stringify({
                            id: this.state.user.id
                      })
            })
            .then(res => res.json())
            .then(entries=> {
                  this.setState(Object.assign(this.state.user,{entries: entries}))
                  this.setState({detectstate: 'default'})
            })
            .catch(err=> console.log('Something wrong in entry count'))
          }
          else{
                this.setState({detectstate: 'default'})
          } 
        })
        .catch(err=> {
            this.setState({detectstate: 'no'})
        })
    }
  }
      

  render() { 
    const display = () => {
      switch(this.state.page) {

        case "mainpage":   return (
                                    <>
                                      <Icon />
                                      <Mainpage Changepage={this.Changepage}/>   
                                    </>
                                  );

        case "signin":   return <Signin Changepage={this.Changepage}
                                        Sign_in={this.Sign_in} />;
        
        case "register": return <Register Changepage={this.Changepage} 
                                          Registered={this.Registered}/>;
                                                 
        case "application":  return (
                                      <>
                                        <Navigation Changepage={this.Changepage}
                                                    isUser={this.state.user.name}
                                                    Clean={this.Clean} />
                                        <Icon />
                                        <Count Name={this.state.user.name}
                                               Entries={this.state.user.entries} />
                                        <Urlbar onDetect={this.onDetect}
                                                Urlchange={this.Urlchange} 
                                                Detectstate={this.state.detectstate} />
                                          {this.state.url 
                                                  ? 
                                        <Imagebox Box={this.state.box} 
                                                  url={this.state.url} />      
                                                  : 
                                                ''
                                          }
                                      </>
                                    );

        default:      return <h1>Something went wrong. Please refresh the page</h1>
      }
    }
    
    return (
      <>
          <Particles className='particle' params={particleParams} />
          { display() }
      </>
    );
  }
}

export default App;

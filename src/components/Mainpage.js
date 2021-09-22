const Mainpage = ({ Changepage }) => {
	return(
		<div className="tc">
			<h1>Hellooooooooo!</h1>
			<h1>I am SmartBrain</h1> 
			<h2>Enter an image URL and I will detect the face in it!!</h2>
			    <div className="center tc">
      			<input 
      				className="center tc b ph3 pv2 input-reset ba b--black bb grow pointer f6 dib" 
      				type="submit" 
      				value="Sign in"
      				onClick={ () => Changepage('signin') }
      				/>
    			</div>

    			<div className="center tc pt3">
      			<input 
      				className="center tc b ph3 pv2 input-reset ba b--black bb grow pointer f6 dib" 
      				type="submit" 
      				value="register"
      				onClick={ () => Changepage('register') }
      				/>
    			</div>

    			<nav style={{display:'flex', justifyContent:'center'}}>
 				      <p    
					       className='pl3 black link underline dim black pointer pr3'
					       onClick={ () => Changepage('application') } >
					       skip
				      </p>
			    </nav>
		</div>
	);
}

export default Mainpage;

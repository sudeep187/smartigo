import React, {Fragment} from 'react';

const Navigation = ({ Changepage, isUser, Clean }) => {
	return(
		<Fragment>
			<nav style={{display:'flex', justifyContent:'flex-end'}}>
			
			  {        isUser 
					      ?
				      <p 
					    onClick={Clean}    
					    className='link underline dim black pointer pr3'>
					    Sign out
				      </p>
				            :
			        <div>
				      <p 
				        onClick={() => Changepage('signin')}    
				        className='link underline dim black pointer pr3'>
				        Sign in
				      </p>

				      <p 
				        onClick={() => Changepage('register')}    
				        className='link underline dim black pointer pr3'>
				        register
				       </p>
				    </div>
			  }
			</nav>

		</Fragment>
	);
}

export default Navigation;
import React, {Fragment} from 'react';
import './Urlbar.css';

const Urlbar = ({ onDetect,Urlchange, Detectstate }) =>{
	const disp = () => {
		switch(Detectstate) {

			case 'default': return(
					<>
						<p className='tc f3'>Enter an image url. I will detect the face..</p>
					</>
			)

			case 'yes': return(
					<>
						<p className='tc f3'>detecting...</p>
					</>
			)

			case 'no': return(
					<>
						<p className='tc f3'>Face not found</p>
					</>
			)
			
			default: return <h1>Something went wrong. Please refresh the page</h1> 
		}
	}

	return(
		<Fragment>
			{ disp() }
				<div className='center pa3 br3 shadow-2 urlbox' style={{width:'500px'}}>
			
					<input 
						className='f6 pa2 w-70 urlinput center br2 ' 
						type='tex' 
						placeholder='Enter url here' 
			        	onChange={Urlchange}/>

					<button className='pointer w-30 grow f6 link ph3 pv2 dib black bg-light-purple'
			        		onClick={onDetect}>
			        	Detect	
			        </button>
	
				</div>
		</Fragment>
	);
}

export default Urlbar;
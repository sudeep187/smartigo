import React, {Fragment} from 'react';
import Tilt from 'react-tilt';
import icon from './icong.png';

const Icon = () => {
	return(
		<Fragment>
			<div className='pl3 pt3 pb3' style={{ display:'flex', justifyContent:'center' }}>
				<Tilt className="Tilt shadow-3 urlbox " options={{ max : 77 }} style={{ height: 110, width: 110 }} >
 					<div className="Tilt-inner"> 
 						<img  alt={'icon'} src={icon} />
 					</div>
				</Tilt>
			</div>
		</Fragment>
	);
}

export default Icon;
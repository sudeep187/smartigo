const Imagebox = ({ Box,url }) =>{
	return(
		<>
			<div className='center ma'>
				<div className='absolute mt2'>
					<img id='inputimage' className='ba' alt='' src={url} width='350px' heigh='auto' />

					<div 
						className='bounding-box' style={{top:Box.toprow, right:Box.rightcol , bottom:Box.bottomrow , left:Box.leftcol}} >
					</div>

				</div>
			</div>
		</>
	);
}

export default Imagebox;
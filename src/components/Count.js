const Count = ({ Name,Entries }) =>{
	const disp = () => {
		if(Name) {
			return(
				<>
					<div className=' count f3 tc'>{`${Name}, your entry count is`}</div>
					<div className=' count f2 tc'>{`${Entries}`}</div>
				</>
			);
		}
		else
			return '';
	}


	return(
		<>
			{ disp() }
		</>
	);

}

export default Count;
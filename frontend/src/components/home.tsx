import {useEffect} from 'react'
import {resetStore} from "../store/events/actions";
import {useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";


const Home = () => {

	const navigate = useNavigate()

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(resetStore());
	}, [dispatch])

	return <>
		<button className='go-to' onClick={() => navigate('/history')}> Show history</button>
		<h2 className='home-title'>Welcome to home page:)</h2>
	</>

}

export default Home
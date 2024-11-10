
import './RoomsInfoStyle.css';
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { useScroll } from '../Components/NavScroll'; 
import Footer from '../Components/Footer';
import NavBar from '../Components/NavBar';


const RoomInfo = () =>{
    const [roomInfos, setRoomInfos] = useState([]);
    const { targetRefRooms, targetRefHotelAreas, targetRefFooter, scrollToRooms, scrollToHotelAreas, scrollToFooter } = useScroll(); // Use the custom hook
    const {key} = useParams();

    useEffect(() => {
        const fetchDate = async () => {

            try{
                const response = await fetch(`http://localhost:4001/api/rooms/${key}`);
                const json = await response.json();

                if(response.ok){
                    setRoomInfos(json);
                }
            }catch(err){
                console.error("Fetch error:", err);
            }
            
        } 

        fetchDate();
    }, [])   

    const handleBg = () => {
        console.log(roomInfos.roomType);
    }

    return(
        <>
            < NavBar scrollToRooms={scrollToRooms} scrollToFooter={scrollToFooter} scrollToHotelAreas={scrollToHotelAreas}/>
            <div className="roomInfo-container"   style={{backgroundImage: `url('/photos/z${roomInfos.roomType}.jpg')`}}>
                <div className='cover-color'>

                    <div className="room-info-txt">
                        <h2>{roomInfos.roomType}</h2>
                        <h5>₱{roomInfos.price} only</h5>
                        <p>{roomInfos.roomDescription}</p>

                        <button>RESERVE NOW</button>
                    </div>
                </div>
            </div>

            <div className='reservation-form'>
                <div className='form-container'>
                    <h1>Reserve Form</h1>
                </div>
            </div>

            <Footer ref={targetRefFooter}/>

        </>
    )
}

export default RoomInfo;
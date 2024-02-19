import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { UserSessionContext } from '../../App';

const Home = () => {
    const navigate = useNavigate();
    const [buttonText, setButtonText] = useState('Sign In');
    const userSessionContext = useContext(UserSessionContext);

    useEffect(() => {
        const token = localStorage.getItem('user');
        if(!userSessionContext) {
            setButtonText('Sign In');
            navigate("/login");
          
        } else {
            setButtonText('Log Out');
        }
        
    },[userSessionContext]);

    const onButtonClick = () => {
        localStorage.removeItem('user');
        setButtonText('Sign In');
        navigate('/login');
    }
  
    return (
      <div className="mainContainer">
        <div className={'titleContainer'}>
          <div>Welcome!</div>
        </div>
        <div>This is the home page.</div>
        {! userSessionContext &&
        <div className={'buttonContainer'}>
          <input
            className={'inputButton'}
            type="button"
            onClick={onButtonClick}
            value={buttonText}
          />
          {/* {userSessionContext ? <div>Your email address is {email}</div> : <div />} */}
        </div>
        }
      </div>
    )
  }
  
  export default Home
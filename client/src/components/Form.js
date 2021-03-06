import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import ReactLoading from 'react-loading';

import Button from './Button';

const Form = props => {
  const [length, setLength] = useState(0);
  const [muse, setMuse] = useState('blueno');

  const handleSubmit = async () => {
    props.setLoading(true);
    const text = await fetch(process.env.REACT_APP_BACKEND_URL + `generate/${muse}/${muse === 'blueno' ? length : length * 5}`);
    const textData = await text.json();
    props.setLoading(false);
    let long;
    if(muse !== 'blueno' && length >= 100) {
      long = true;
    } else {
      long = false;
    }
    nav(textData, long);
  }

  const nav = (textData, long) => {
    props.history.push({
      pathname: '/viewText',
      state: {
        text: textData, 
        muse: muse, 
        long: long
      }
    });
  }

  return (
    props.loading ? (
      <Fade>
        <div style={styles.container}>
          <h1 style={styles.loading}>Loading...</h1>
          <ReactLoading type="spinningBubbles" color="gray" height={100} width={100} />
        </div>
      </Fade>
    ) : (
      <div style={styles.container}>
        <h2 style={styles.question}>Every writer has a muse.</h2>
        <h3 style={styles.subQuestion}>Choose one.</h3>
        <div style={styles.buttonContainer}>
          <Button text="Dear Blueno" color={muse === 'blueno' ? "#C8E3D6" : "#dbf6e9"} onClick={() => setMuse('blueno')} />
          <Button text="Donald Trump" color={muse === 'trump' ? "#C8E3D6" : "#dbf6e9"} onClick={() => setMuse('trump')} />
          <Button text="Jane Austen" color={muse === 'austen' ? "#C8E3D6" : "#dbf6e9"} onClick={() => setMuse('austen')} />
        </div>
        <p style={styles.note}>
          {
            muse === 'blueno' ? <div>generated using text scraped from the Dear Blueno Facebook page</div> 
              : muse === 'trump' ? <div>generated using Trump's 2016 campaign speeches</div>
              : muse === 'austen' ? <div>generated using Jane Austen's Pride and Prejudice</div> : null
          }
        </p>
        <h2 style={{ ...styles.question, marginBottom: 20 }}>How long would you like the story to be?</h2>
        <div style={styles.buttonContainer}>
          <Button text={`${muse === 'blueno' ? 25 : 125} words`} color={length === 25 ? "#C8E3D6" : "#dbf6e9"} onClick={() => setLength(25)}/>
          <Button text={`${muse === 'blueno' ? 50 : 250} words`} color={length === 50 ? "#C8E3D6" : "#dbf6e9"} onClick={() => setLength(50)}/>
          <Button text={`${muse === 'blueno' ? 100 : 500} words`} color={length === 100 ? "#C8E3D6" : "#dbf6e9"} onClick={() => setLength(100)}/>
          <Button text={`${muse === 'blueno' ? 200 : 1000} words`} color={length === 200 ? "#C8E3D6" : "#dbf6e9"} onClick={() => setLength(200)}/>
        </div>
        <p>Note: there may be a short delay the first time you press submit due to how the backend is deployed.</p>
        <Button text="Submit" color='#9DDFD3' onClick={handleSubmit} disabled={length === 0 || muse === null}/>
    </div>
    )
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  question: {
    fontSize: 28,
    letterSpacing: 1,
    fontWeight: 'normal',
    margin: 0
  },
  subQuestion: {
    fontSize: 24,
    letterSpacing: 0.8,
    fontWeight: 'normal',
    margin: 0,
    marginTop: 10,
    marginBottom: 10
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 0,
    marginBottom: 0
  },
  loading: {
    letterSpacing: 4, 
    fontSize: 50, 
    fontWeight: 'normal'
  }, 
  note: {
    //alignSelf: 'flex-start',
    margin: 0,
    marginBottom: 30
  }
}

export default withRouter(Form);
import React, { useState,useEffect } from 'react';
import './App.css';
import { ZkBobClient, TxType } from 'zkbob-client-js';
import { ZkClientProvider } from './Context/ZkClient';
import { Auth } from './Components/Auth';
import { ShieldedAddressGenerator } from './Components/ShieldedAddressGenerator';
import { PasswordInput } from './utils/keyManagement'
import { InfoList } from './Components/InfoList';
import DirectDeposit from './Components/DirectDeposit';
import Swap from './swap/Swap';

import styled from 'styled-components';

const Page = styled.div`
    position: relative;
    height:100vh;
    width: 100vw;
`;
const Button = styled.button`
    position: absolute;
    top:82%;
    left:46%;
    transform: translate(-50%,-50%);
    background-color: #9370DB;
    color : black;
    font-size: 10px;
    margin: 1em;
    padding: 4px 50px;
    border:none ;
    border-radius: 10px;
    height:6vh;
    width:30vw;
    text-align: center;
    font-weight:bold;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-weight: 750;
    div{
        margin-left:0.2rem;
    }

`;
const Encadre = styled.div`
position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    height:45vh;
    width:40vw;
    border: none;
    border-radius: 10px;
    box-shadow: 5px 10px 180px #9370DB, 5px 10px 180px #DDA0DD;
`;
const Transfer = styled.div`
position: absolute;
    left:9%;
    top:6%;
    font-size:30px;
    font-weight:bold;

`;
const Es = styled.div`
position: absolute;
    left:9%;
    top:17%;
    font-size:15px;
`;
const Cadrehaut = styled.div`
position: absolute;
    top:0%;
    left:0%;
    height:8vh;
    width:100vw;
    border: none;
    border-radius: 10px;
    box-shadow: 5px 10px 180px #9370DB, 5px 10px 180px #DDA0DD;
    position: relative;
    & .transfert{
      position: absolute;
      top:27%;
      left:25%;
      font-size:20px;
    }
    & .Withdraw{
      position: absolute;
      top:27%;
      left:43%;
      font-size:20px;
    }
    & .Litepaper{
      position: absolute;
      top:27%;
      left:65%;
      font-size:20px;
    }
`;
const From = styled.input`
    position: absolute;
    top:35%;
    left:50%;
    transform: translate(-50%,-50%);
    height:7vh;
    width:33vw;
    border: none;
    color:black;
    border-radius: 10px;
    background-color: #e7e7e7;
    font-size: 15px;
    padding-left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500; 
`;
const To = styled.input`
    position: absolute;
    top:62%;
    left:50%;
    transform: translate(-50%,-50%);
    height:7vh;
    width:33vw;
    border: none;
    border-radius: 10px;
    background-color: #e7e7e7;
    font-size: 15px;
    padding-left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
 
`;
const TxHash = styled.div`
    position: absolute;
    top:72%;
    left:50%;
    transform: translate(-50%,-50%);
    font-size:12px;
    color:gray;
`;
const Tx = styled.div`
    position: absolute;
    top:76%;
    left:50%;
    transform: translate(-50%,-50%);
    font-size:10px;
    color:gray;
`;
const Quote = styled.div`
    position: absolute;
    top:62%;
    left:49%;
    transform: translate(-50%,-50%);
    background-color: #e7e7e7;
    font-size:13px;
    font-weight: 500; 
    padding-left: 0.5rem;
`;
const Matic = styled.div`
    position: absolute;
    top:35%;
    left:80%;
    transform: translate(-50%,-50%);
    font-size:15px;
`;
const Eth = styled.div`
    position: absolute;
    top:62%;
    left:80%;
    transform: translate(-50%,-50%);
    font-size:15px;
`;
const Arrow = styled.div`
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    font-size:15px;
`;
const AuthContenant= styled.div`
position: absolute;
      top:3.5%;
      left:85%;
transform: translate(-50%,-50%);
font-size:15px;
`;

export const ZK_ADDRESS_KEY = 'zkAddress';

function App() {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const handleButtonClick = async () => {
    // Désactiver le bouton au clic
    setButtonDisabled(true);

    // Faire l'appel API ou le traitement ici
    // Par exemple, attendre 2 secondes pour simuler une requête asynchrone
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Réactiver le bouton après la réponse
    setButtonDisabled(false);
  };
  useEffect(() => {
    localStorage.setItem(ZK_ADDRESS_KEY, "");
  }, []);

  const redirectToURL = () => {
    window.open("https://staging--zkbob.netlify.app/", "_blank");
  };
  async function swap() {
    setSuccess(false);
    setLoading(true);
      const timer = setTimeout(() => {
        setData(
          "hello"
        );
        setLoading(false);
        setSuccess(true);
      }, 1000);
      return () => clearTimeout(timer);
  }
  
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string>();
  const [success, setSuccess] = useState(false);
  const [inputValue, setInputValue] = useState("");
  

  return (
    <div className="App">
               
            
       <>
       <ZkClientProvider>
    <Page>
      <Cadrehaut>
        <div className="transfert">Transfer</div>
        <div className="Withdraw">Whithdraw</div>
        <div className="Litepaper">Litepaper</div>
      </Cadrehaut>
        <AuthContenant>
          <Auth/>
        </AuthContenant>
        <AuthContenant>
          <ShieldedAddressGenerator handleButtonClick={handleButtonClick} buttonDisabled={buttonDisabled} />
        </AuthContenant>
      {/* <DirectDeposit /> */}
      <Encadre>
        <Es>Get Privacy, don't let them know next tx</Es>
        <Transfer>Direct Deposit</Transfer>
        <From
          type="text"
          placeholder="Amount"
          onChange={(event) => {
          }}
        />
        <To type="text" placeholder="Zkbob Address" />
        <Button onClick ={swap}>
          {loading && !success ? <div>Loading....</div> : <div>Deposit </div>}
          {success ? <div> Success!</div> : null}
        </Button>
        <TxHash></TxHash>
        <Tx></Tx>
        <Quote>{localStorage.getItem(ZK_ADDRESS_KEY)? localStorage.getItem(ZK_ADDRESS_KEY) : ''}</Quote>
        <Matic>ETH</Matic>
        <Arrow>🢃</Arrow>
      </Encadre>
    </Page>
    </ZkClientProvider>
  </>
    </div>
     );
}

export default App;
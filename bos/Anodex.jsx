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
    font-size:15px;
    font-weight:bold;

`;
const Es = styled.div`
position: absolute;
    left:9%;
    top:15%;
    font-size:9px;
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
      top:30%;
      left:25%;
      font-size:13px;
    }
    & .Withdraw{
      position: absolute;
      top:30%;
      left:43%;
      font-size:13px;
    }
    & .Litepaper{
      position: absolute;
      top:30%;
      left:65%;
      font-size:13px;
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
    left:20%;
    transform: translate(-50%,-50%);
    font-size:15px;
    font-weight: 500; 
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

async function swap() {
  setSuccess(false);
  setLoading(true);
  asyncFetch("http://localhost:3001/swap").then((res) => {
    setData(res);
    setLoading(false);
    setSuccess(true);
  });
}
async function quote() {
  asyncFetch("http://localhost:3001/quote").then((res) => {
    setInputValue(res);
  });
}

const [loading, setLoading] = useState(false);
const [data, setData] = useState(null);
const [success, setSuccess] = useState(false);
const [inputValue, setInputValue] = useState("");

return (
  <>
    <Page>
      <Cadrehaut>
        <div className="transfert">Transfer</div>
        <div className="Withdraw">Whithdraw</div>
        <div className="Litepaper">Litepaper</div>
      </Cadrehaut>
      <Encadre>
        <Es>Get Privacy, don't let them know next tx</Es>
        <Transfer>Transfer</Transfer>
        <From
          type="text"
          placeholder="From"
          onChange={(event) => {
            quote()
          }}
        />
        <To type="text" placeholder="" />
        <Button onClick={swap}>
          {loading && !success ? <div>Loading....</div> : <div>Swap </div>}
          {success ? <div> Success!</div> : null}
        </Button>
        <TxHash>TxHash: </TxHash>
        <Tx>{data}</Tx>
        <Quote>{inputValue}</Quote>
        <Matic>MATIC</Matic>
        <Eth>ETH</Eth>
        <Arrow>🢃</Arrow>
      </Encadre>
    </Page>
  </>
);

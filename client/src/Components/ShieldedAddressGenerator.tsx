import React, { useContext, useState } from 'react';
import ZkClientContext from '../Context/ZkClient';

interface ShieldedAddressGenerator {
  handleButtonClick: () => void;
  buttonDisabled: boolean;
}

export const MNEMONIC_KEY = 'mnemonic';
export const ZK_ADDRESS_KEY = 'zkAddress';

export const ShieldedAddressGenerator: React.FC<ShieldedAddressGenerator> = ({
  handleButtonClick,
  buttonDisabled,
}) => {
  const { zkClient } = useContext(ZkClientContext);
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [mnemonic, setMnemonic] = useState<string | undefined>(undefined);
  const { getMnemonic } = useContext(ZkClientContext);
  
  const genAddress = async () => {
    if (!zkClient) return;

    try {
      handleButtonClick(); // Appeler la fonction parent pour désactiver le bouton

      const _address = await zkClient.generateUniversalAddress();
      const addressString = _address.toString();
      const addressWithoutPrefix = addressString.replace(/^zkbob:/, '');
      localStorage.setItem(ZK_ADDRESS_KEY, addressWithoutPrefix.toString());
      console.log('address: ', _address);
      setAddress(addressWithoutPrefix.toString());
      const _mnemonic = getMnemonic();

      setMnemonic(_mnemonic);
      console.log(_mnemonic);
    } catch (error) {
      console.error('Erreur lors de la génération de l\'adresse :', error);
    }
  };

  return (
    <div>
      {zkClient && (
        <>
        <div>
          <button onClick={genAddress} disabled={buttonDisabled} className={buttonDisabled ? 'disabled' : ''}>
            Generate Address
          </button>
        </div>
        <div>
          {address && <p className="text-xs absolute top-[100%] left-[-80%]"><b>Zbob: </b>{address}</p>}
          {mnemonic && <p className="text-xs absolute top-[200%] left-[-80%]"><b>Mnemonic:</b> {mnemonic}</p>}
          </div>
          </>
      )}
    </div>
  );
};
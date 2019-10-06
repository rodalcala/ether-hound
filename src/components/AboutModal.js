import React from 'react';
import { Modal, Button, Text } from '@aragon/ui';

const AboutModal = ({ opened, setOpened }) => (
  <Modal visible={opened} onClose={() => setOpened(false)}>
    <div className="AboutModal-container">
      <div className="AboutModal-info">
        <Text size="large" className="AboutModal-info-head">Webapp created by Rodrigo Alcala for Aragon One's technical challenge.</Text>
        <Text>The app allows you to explore Ethereums's mainnet latest blocks.</Text>
        <Text>You can pick which block's transaction to analyle.</Text>
        <Text>It also let's you set the amount of blocks to fetch and shows a small overview of the dataset.</Text>
      </div>
      <Button emphasis="negative" size="small" mode="outline" onClick={() => setOpened(false)}>Close modal</Button>
    </div>
  </Modal>
);

export default AboutModal;

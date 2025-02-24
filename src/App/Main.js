import { useState } from 'react';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import {
  Panel,
  Switch,
  Tooltip,
  TextField,
  Button,
  FieldSet,
  confirm,
  apiCall,
  showErrorDialog,
  showSuccessDialog,
} from 'nexus-module';

import Catalogue from './catalogue';

const DemoTextField = styled(TextField)({
  maxWidth: 400,
});

export default function Main() {
  const coreInfo = useSelector((state) => state.nexus.coreInfo);
  const userStatus = useSelector((state) => state.nexus.userStatus);
  
  

  return (
    <Panel title="React Redux Module" icon={{ url: 'react.svg', id: 'icon' }}>
      <div className="text-center">
        <HorizontalTab.TabBar>
          <HorizontalTab
            active={activeTab === 'Catalogue'}
            onClick={() => handleSwitchTab('Catalogue')}
          >
            Catalogue
          </HorizontalTab>
        </HorizontalTab.TabBar>
      </div>

      <div>{activeTab === 'Catalogue' && <Catalogue />}</div>

    </Panel>
  );
}

import { useState } from 'react';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import {
  Panel,
  HorizontalTab,
} from 'nexus-module';

import { switchTab } from 'actions/actionCreators';

import Catalogue from './catalogue';
import Products from './products';

export default function Main() {
  const activeTab = useSelector((state) => state.ui.activeTab);
  const dispatch = useDispatch();

  const handleSwitchTab = (tab) => {
    dispatch(switchTab(tab));
  };
  
  return (
    <Panel title="MRP module" icon={{ url: 'react.svg', id: 'icon' }}>
      <div className="text-center">
        <HorizontalTab.TabBar>
          <HorizontalTab
            active={activeTab === 'Catalogue'}
            onClick={() => handleSwitchTab('Catalogue')}
          >
            Catalogue
          </HorizontalTab>
          <HorizontalTab
            active={activeTab === 'Products'}
            onClick={() => handleSwitchTab('Products')}
          >
            Products
          </HorizontalTab>
        </HorizontalTab.TabBar>
      </div>

      <div>{activeTab === 'Catalogue' && <Catalogue />}</div>
      <div>{activeTab === 'Products' && <Products />}</div>

    </Panel>
  );
}

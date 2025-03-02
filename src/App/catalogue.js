import {
    SingleColRow,
    PageLayout,
    CatalogueTable,
} from '../components/styles';

import { useState, useEffect } from 'react';
import styled from '@emotion/styled';

import {
    FieldSet,
    apiCall,
    showSuccessDialog,
    showErrorDialog,
    TextField,
} from 'nexus-module';

import { useSelector, useDispatch } from 'react-redux';

import {
    updateInput,
} from 'actions/actionCreators';

const SearchField = styled(TextField)({
    maxWidth: 200,
  });

export default function Catalogue() {

    const inputValue = useSelector((state) => state.ui.inputValue);
    //const catalogue = useSelector((state) => state.ui.catalogue);
    const [catalogue, setCatalogue] = useState([]);

    const dispatch = useDispatch();

    const fetchCatalogue = async () => {
        
        // distordia-catalogue assets shall have the following fields:
        // 1. category
        // 2. supplier
        // 3. description
        // 4. url (link to the datasheet)
        // 5. status (active/inactive)
        // 6. distordia (yes/no)

        try {
            const result = await apiCall(
                'register/list/assets:asset'//,
                //{
                //    where: "results.distordia=yes;",
                //}
            ).catch((error) => {
                showErrorDialog({
                    message: 'Cannot get catalogue',
                    note: error?.message || 'Unknown error',
                });
            });
            
            if (result) {
                const resultDistordia = result.filter((item) => item.distordia === 'yes');
                const resultActive = resultDistordia.filter((item) => item.status === 'active');
                setCatalogue(resultActive);
            }

        } catch (error) {
            showErrorDialog({
                message: 'Cannot get catalogue',
                note: error?.message || 'Unknown error',
            });
        }
    }

    useEffect(() => {

        fetchCatalogue();

    }, []);

    const handleChange = (e) => {
        dispatch(updateInput(e.target.value));
    };

    const [checkingAssets, setCheckingAssets] = useState(false);
    
    const viewAsset = async ( address ) => {
        
        if (checkingAssets) {
            return;
        }

        try {
            setCheckingAssets(true);
            const result = await apiCall(
                'register/get/assets:asset',
                 {
                    address: address,
                    //where: 'results.json.distordia=yes'
                 }
            );
            showSuccessDialog({
                message: 'Tritium Metrics',
                note: JSON.stringify(result, null, 2),
            });
        } catch (error) {
            showErrorDialog({
                message: 'Cannot get metrics',
                note: error?.message || 'Unknown error',
            });
        } finally {
            setCheckingAssets(false);
        }
    };

    const renderCatalogueTable = (data) => {
        if (!Array.isArray(data)) {
          return null;
        }
        return data.map((item, index) => (
          <CatalogueTable
          key={index}
          onClick={() => viewAsset(item.address)}
          >
          <td>{ item.address }</td>
          <td>{ item.category }</td>
          <td>{ item.supplier }</td>
          <td>{ item.description }</td>
          <td>{ item.url }</td>
          </CatalogueTable>
        ));
      };

    return (
      <PageLayout>
        <SingleColRow>
            <div className="text-center">
                <SearchField
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Search"
                />
            </div>
        </SingleColRow>
        <SingleColRow>
            <div className="text-center">
                <FieldSet legend="Catalogue">
                    <tbody>
                        {renderCatalogueTable(catalogue)}
                    </tbody>
                </FieldSet>
            </div>
        </SingleColRow>
      </PageLayout>
    );
}

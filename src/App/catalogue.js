import {
    SingleColRow,
    PageLayout,
} from '../components/styles';

import {
    FieldSet,
    apiCall,
} from 'nexus-module';

import { useDispatch } from 'react-redux';

import {
    updateInput,
} from 'actions/actionCreators';

export default function Catalogue() {

    const inputValue = useSelector((state) => state.ui.inputValue);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        dispatch(updateInput(e.target.value));
    };
    const [checkingAssets, setCheckingAssets] = useState(false);
    
    const viewAsset = async () => {
        try {
            setCheckingAssets(true);
            const result = await apiCall(
                'register/list/assets:assets',
                 {
                    where: 'results.json.distordia=yes'
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

    return (
      <PageLayout>
        <SingleColRow>
            <div className="text-center">
                <TextField
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Search"
                />
            </div>
        </SingleColRow>
        <SingleColRow>
            <div className="text-center">
                <FieldSet title="Catalogue">
                    
                </FieldSet>
            </div>
        </SingleColRow>
      </PageLayout>
    );
}

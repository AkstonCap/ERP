import { apiCall, showSuccessDialog, showErrorDialog } from 'nexus-module';

export const createAsset = async (assetData, onSuccess = () => {}, onError = () => {}) => {
  try {
    // Validate required fields
    if (!assetData.name || !assetData.category || !assetData.supplier) {
      showErrorDialog({
        message: 'Missing required fields',
        note: 'Please fill in name, category and supplier fields'
      });
      return;
    }
    
    const result = await apiCall('assets/create/asset', {
      name: assetData.name,
      data: JSON.stringify({
        category: assetData.category,
        supplier: assetData.supplier,
        description: assetData.description,
        url: assetData.url,
        status: assetData.status,
        distordia: assetData.distordia
      })
    });
    
    showSuccessDialog({
      message: 'Asset Created',
      note: `Successfully created asset: ${result.address}`
    });
    
    onSuccess(result);
    return result;
    
  } catch (error) {
    showErrorDialog({
      message: 'Failed to create asset',
      note: error?.message || 'Unknown error'
    });
    
    onError(error);
    throw error;
  }
};
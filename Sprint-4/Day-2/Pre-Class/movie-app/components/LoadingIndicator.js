import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

const LoadingIndicator = ({ visible }) => {
  return (
    <Spinner
      visible={visible}
      textContent={'Loading...'}
      textStyle={{ color: '#fff' }}
    />
  );
};

export default LoadingIndicator;
